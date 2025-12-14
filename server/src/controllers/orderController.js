import { asyncHandler } from '../utils/asyncHandler.js';
import Product from '../models/productModel.js';
import Order from '../models/orderModel.js';
import User from '../models/userModel.js';
import stripe from 'stripe';

// Function for place order COD : /api/order/cod
const placeOrderCOD = asyncHandler(async (req, res) => {

    //get data from frontend
    const { userId, items, address } = req.body

    //check items and address not empty
    if (!address || !items || items.length === 0) {
        return res.status(401).json({ success: false, message: "Invalid Data" })
    }

    // calculate amount using items
    let amount = await items.reduce(async (acc, item) => {
        const product = await Product.findById(item.product)
        return (await acc) + product.offerPrice * item.quantity;
    }, 0)

    // add tax charge (2%)
    amount += Math.floor(amount * 0.02)

    //create order on database
    const order = await Order.create({
        userId,
        items,
        amount,
        address,
        paymentType: "COD",
    })

    //send response to frontend
    return res.status(201).json({
        success: true,
        data: order,
        message: "Order Placed"
    })

})


// Function for place order online : /api/order/online
const placeOrderOnline = asyncHandler(async (req, res) => {

    //get data from frontend
    const { userId, items, address } = req.body;
    const { origin } = req.headers;

    //check items and address not empty
    if (!address || !items || items.length === 0) {
        return res.status(401).json({ success: false, message: "Invalid Data" })
    }

    let productData = []

    // calculate amount using items
    let amount = await items.reduce(async (acc, item) => {
        const product = await Product.findById(item.product);
        productData.push({
            name: product.name,
            price: product.offerPrice,
            quantity: item.quantity,
        })
        return (await acc) + product.offerPrice * item.quantity;
    }, 0)

    // add tax charge (2%)
    amount += Math.floor(amount * 0.02)

    // check if user amount not less than min amount
    const MIN_AMOUNT_INR = Number(process.env.MIN_AMOUNT_INR || 50);
    if (amount < MIN_AMOUNT_INR) {
        return res.status(400).json({ success: false, message: `Minimum order amount for online payment is ₹${MIN_AMOUNT_INR}. Please add more items or choose Cash on Delivery.` })
    }

    //create order on database
    const order = await Order.create({
        userId,
        items,
        amount,
        address,
        paymentType: "Online",
    })

    // stripe gateway initialize
    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

    // create line items for stripe payment
    const line_items = productData.map((item) => {
        const unitPriceWithTax = item.price * 1.02; // include 2% tax per item
        return {
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name,
                },
                unit_amount: Math.round(unitPriceWithTax * 100),
            },
            quantity: item.quantity,
        }
    })

    // create stripe session
    const session = await stripeInstance.checkout.sessions.create({
        line_items,
        mode: "payment",
        success_url: `${origin}/loader?next=order`,
        cancel_url: `${origin}/cart`,
        metadata: {
            orderId: order._id.toString(),
            userId,
        }
    })

    //send response to frontend
    return res.status(201).json({
        success: true,
        data: order,
        url: session.url,
        message: "Order Placed"
    })

})


// Stripe Webhooks to verify payment active : /stripe
export const StripeWebhooks = asyncHandler(async (req, res) => {

    // stripe gateway initialize
    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

    const sig = req.headers["stripe-signature"];
    let event;

    try {
        event = stripeInstance.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (error) {
        return res.status(400).send(`Webhook Error: ${error.message}`)
    }

    // handle the event
    switch (event.type) {
        case "payment_intent.succeeded": {
            const paymentIntent = event.data.object;
            const paymentIntentId = paymentIntent.id;

            // Getting Session metadata
            const session = await stripeInstance.checkout.sessions.list({
                payment_intent: paymentIntentId,
            })

            const { userId, orderId } = session.data[0].metadata;

            // Mark payment as paid
            await Order.findByIdAndUpdate(orderId, { isPaid: true })

            // Clear 
            await User.findByIdAndUpdate(userId, { cartItems: {} })

            break;
        }

        case "payment_intent.payment_failed": {
            const paymentIntent = event.data.object;
            const paymentIntentId = paymentIntent.id;

            // Getting Session metadata
            const session = await stripeInstance.checkout.sessions.list({
                payment_intent: paymentIntentId,
            })

            const { orderId } = session.data[0].metadata;

            // Delate order 
            await Order.findByIdAndDelete(orderId);

            break;
        }

        default:
            console.error(`unhandled event type ${event.type}`)
            break;
    }

    res.json({ received: true })

})


// Function  for get order by userId : /api/order/user
const getUserOrder = asyncHandler(async (req, res) => {

    const userId = req.user._id

    // find order on the database
    const order = await Order.find({
        userId,
        $or: [{ paymentType: "COD" }, { isPaid: true }]
    }).populate("items.product address").sort({ createdAt: -1 })

    //send response to frontend
    return res.status(200).json({
        success: true,
        data: order,
        message: "Order data fetched"
    })

})


// Function for all order (seller) : /api/order/seller
const getAllOrder = asyncHandler(async (req, res) => {

    // find order on the database
    const order = await Order.find({
        $or: [{ paymentType: "COD" }, { isPaid: true }]
    }).populate("items.product address").sort({ createdAt: -1 })

    // send response to frontend
    return res.status(200).json({
        success: true,
        data: order,
        message: "Order data fetched"
    })

})


export {
    placeOrderCOD, placeOrderOnline, getUserOrder, getAllOrder
}
