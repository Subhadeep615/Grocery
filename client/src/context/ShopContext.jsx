import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = "₹"

    const navigate = useNavigate();
    const [user, setUser] = useState(null)
    const [isSeller, setIsSeller] = useState(false)
    const [showUserLogin, setShowUserLogin] = useState(false)
    const [products, setProducts] = useState([])
    const [cartItems, setCartItems] = useState({})
    const [searchQuery, setSearchQuery] = useState({})

    //fetch user status
    const fetchUser = async () => {
        try {
            const response = await axios.get('/api/user/profile')
            if (response?.data?.success) {
                setUser(response.data.data)
                setCartItems(response.data.data.cartItems || {})
            } else {
                setUser(null)
                setCartItems({})
            }
        } catch (error) {
            setUser(null)
            setCartItems({})
        }
    }

    // fetch seller status
    const fetchSeller = async () => {
        try {
            const response = await axios.get('/api/admin/profile')
            if (response?.data?.success) {
                setIsSeller(true)
            } else {
                setIsSeller(false)
            }
        } catch (error) {
            setIsSeller(false)
        }
    }

    // fetch all product
    const fetchProducts = async () => {
        try {
            const response = await axios.get('/api/product/list')

            if (response?.data?.success) {
                setProducts(response.data.data)
            }
        } catch (error) {
            toast.error(String(error?.response?.data?.message || "Failed to fetch products"))
        }
    }

    // add product to card
    const addToCart = async (itemId) => {
        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            cartData[itemId] += 1;
        } else {
            cartData[itemId] = 1;
        }

        setCartItems(cartData);
        toast.success("Added to cart")
    }

    // Update Cart Items Quantity
    const updateCartItem = async (itemId, quantity) => {
        let cartData = structuredClone(cartItems)

        cartData[itemId] = quantity;

        setCartItems(cartData)
        toast.success("Cart Updated")
    }

    // remove product from cart
    const removeToCart = async (itemId) => {
        let cartData = structuredClone(cartItems)

        if (cartData[itemId]) {
            cartData[itemId] -= 1;
            if (cartData[itemId] === 0) {
                delete cartData[itemId];
            }
        }

        setCartItems(cartData);
        toast.success("Remove from cart")

    }

    // get cart item count
    const getCartCount = () => {
        let totalCount = 0;
        for (const item in cartItems) {
            totalCount += cartItems[item];
        }
        return totalCount;
    }

    // get cart total amount
    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            if (cartItems[items] > 0) {
                totalAmount += itemInfo.offerPrice * cartItems[items]
            }
        }
        return Math.floor(totalAmount * 100) / 100;
    }

    useEffect(() => {
        fetchProducts()
        fetchSeller()
        fetchUser()
    }, [])

    // update cart items
    useEffect(() => {
        const updateCart = async () => {
            try {
                const response = await axios.post('/api/cart/update', { cartItems })
                if (!response?.data?.success) {
                    toast.error(response.data.message)
                }
            } catch (error) {
                toast.error(String(error?.response?.data?.message || "something went wrong"))
            }
        }
        if (user) {
            updateCart()
        }
    }, [cartItems])

    const value = {
        navigate, products, currency,

        user, setUser,

        isSeller, setIsSeller,

        showUserLogin, setShowUserLogin,

        searchQuery, setSearchQuery,

        cartItems, setCartItems,

        fetchProducts,

        addToCart, removeToCart, updateCartItem,

        getCartCount, getCartAmount,
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;