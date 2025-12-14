import { asyncHandler } from '../utils/asyncHandler.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js'
import Product from '../models/productModel.js';


// Function for Add Product : /api/product/add
const addProduct = asyncHandler(async (req, res) => {

    // get product details from frontend
    const { name, description, price, offerPrice, category, inStock } = req.body;

    //check product details not empty
    if (!name || !description || !price || !offerPrice || !category) {
        return res.status(400).json({ success: false, message: "All product details are required" })
    }

    // get product images from frontend
    const image = req.file?.path

    // check image is uploaded
    if (!image) {
        return res.status(400).json({ success: false, message: "Image is required" })
    }

    // upcload images to cloudinary
    const imageUrl = await uploadOnCloudinary(image)

    // create new product in database
    const newProduct = await Product.create({
        name,
        description,
        price: Number(price),
        offerPrice: Number(offerPrice),
        category,
        inStock: inStock === "true" ? true : false,
        image: [imageUrl]
    })

    // check for product creation
    const createdProduct = await Product.findById(newProduct._id)
    if (!createdProduct) {
        return res.status(500).json({ success: false, message: "Product creation failed, please try again" })
    }

    // send response to frontend
    return res.status(201).json({
        success: true,
        data: createdProduct,
        message: "Product Added"
    })

})


// Function for list Product : /api/product/list
const listProduct = asyncHandler(async (req, res) => {

    // fetch all products from database
    const products = await Product.find({})

    // send response to fontend
    return res.status(200).json({
        success: true,
        data: products,
        message: "Product List Fetched"
    })

})


// Function for inStock Product : /api/product/stock
const changeStock = asyncHandler(async (req, res) => {

    //get product id or inStock from frontend
    const { productId, inStock } = req.body

    // check product id not empty
    if (!productId) {
        return res.status(400).json({ success: false, message: "Product ID is required" })
    }

    // update product stock in database
    await Product.findByIdAndUpdate(productId, { inStock })

    // send response to frontend
    return res.status(200).json({
        success: true,
        message: "Product Stock Updated"
    })

})

export {
    addProduct, listProduct, changeStock
}
