import React, { useContext } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { ShopContext } from './context/ShopContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './components/Login'
import Loading from './components/Loading'
import ProtectedRoutes from './utils/ProtectedRoutes'


//import pages
import Home from './pages/Home'
import AllProduct from './pages/AllProduct'
import ProductCategory from './pages/ProductCategory'
import ProductDetails from './pages/ProductDetails'
import About from './pages/About'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import AddAddress from './pages/AddAddress'
import MyOrder from './pages/MyOrder'

// import seller 
import SellerLogin from './components/seller/SellerLogin'
import SellerLayout from './pages/seller/SellerLayout'
import AddProduct from './pages/seller/AddProduct'
import ProductList from './pages/seller/ProductList'
import Orders from './pages/seller/Orders'


const App = () => {

    const isSellerPath = useLocation().pathname.includes('seller')
    const { showUserLogin, isSeller } = useContext(ShopContext)

    return (
        <div className='text-default min-h-screen text-gray-700 bg-white'>

            {isSellerPath ? null : <Navbar />}
            {showUserLogin ? <Login /> : null}

            <Toaster />


            <div className={`${isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"}`}>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/products' element={<AllProduct />} />
                    <Route path='/products/:category' element={<ProductCategory />} />
                    <Route path='/products/:category/:id' element={<ProductDetails />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/contact' element={<Contact />} />
                    <Route path='/cart' element={<Cart />} />
                    <Route path='/add-address' element={
                        <ProtectedRoutes>
                            <AddAddress />
                        </ProtectedRoutes>
                    } />
                    <Route path="/order" element={
                        <ProtectedRoutes>
                            <MyOrder />
                        </ProtectedRoutes>
                    } />
                    <Route path='/loader' element={<Loading />} />

                    {/* seller */}
                    <Route path='/seller' element={isSeller ? <SellerLayout /> : <SellerLogin />}>
                        <Route index element={isSeller ? <AddProduct /> : null} />
                        <Route path='product-list' element={<ProductList />} />
                        <Route path='orders' element={<Orders />} />
                    </Route>

                </Routes>
            </div>

            {isSellerPath ? null : <Footer />}
        </div>
    )
}

export default App
