import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import { useParams } from 'react-router-dom';
import { Star } from 'lucide-react';
import Title from '../components/Title';
import ProductCard from '../components/ProductCard';

const ProductDetails = () => {

    const { user, products, currency, addToCart } = useContext(ShopContext)
    const { id } = useParams()

    const [relatedProducts, setRelatedProducts] = useState([])

    const product = products.find((item) => item._id === id);

    useEffect(() => {
        if (products.length > 0) {
            let productsCopy = products.slice();

            productsCopy = productsCopy.filter((item) => product.category.toLowerCase() === item.category.toLowerCase())
            setRelatedProducts(productsCopy.slice(0, 5))
        }
    }, [products])

    return product && (
        <div className="mt-16">

            {/* product details */}
            <div className="flex flex-col md:flex-row gap-16 mt-4">

                <div className="border border-gray-500/30 max-w-125 rounded overflow-primary-dulldden">
                    <img src={product.image[0]} alt="Selected product" className="w-full h-full object-cover" />
                </div>

                <div className="text-sm w-full md:w-1/2">
                    <h1 className="text-3xl font-medium">{product.name}</h1>

                    <div className="flex items-center gap-0.5 mt-1">
                        {Array(5).fill("").map((_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < 4 ? "text-green-600 fill-green-600" : "text-green-200 fill-green-200"}`} />
                        ))}
                        <p>(4)</p>
                    </div>

                    <div className="mt-6">
                        <p className="text-gray-500/70 line-through">MRP: {currency}{product.price}</p>
                        <p className="text-2xl font-medium">MRP: {currency}{product.offerPrice}</p>
                        <span className="text-gray-500/70">(inclusive of all taxes)</span>
                    </div>

                    <p className="text-base font-medium mt-6">About Product</p>
                    <p className="text-gray-500/70">{product.description}</p>

                    {user && <div className="mt-10 text-base">
                        <button onClick={() => addToCart(product._id)} className="w-[50%] py-3.5 cursor-pointer text-lg font-medium border bg-primary/10 border-primary/40 text-primary" >
                            Add to Cart
                        </button>
                    </div>}
                </div>
            </div>

            {/* related product */}
            <div className="flex flex-col item-center mt-20">
                <div className="text-2xl md:text-3xl text-center">
                    <Title text={"Related Products"} />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6 mt-6">
                    {relatedProducts.filter((product) => product.inStock).map((product, index) => (
                        <ProductCard key={index} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
};


export default ProductDetails
