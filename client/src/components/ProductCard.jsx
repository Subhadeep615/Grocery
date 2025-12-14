import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext';
import { Plus, Star } from 'lucide-react';

const ProductCard = ({ product }) => {

    const { currency, user, navigate, cartItems, addToCart, removeToCart } = useContext(ShopContext)

    return product && (

        <div onClick={() => { navigate(`/products/${product.category.toLowerCase()}/${product._id}`); scrollTo(0, 0) }} className="border border-gray-500/20 rounded-md md:px-4 px-3 py-2 bg-white max-w-56 w-full">

            {/* product image */}
            <div className="cursor-pointer flex items-center justify-center px-2">
                <img className="max-w-26 md:max-w-36" src={product.image} alt="" />
            </div>

            <div className="text-gray-500/60 text-sm">

                {/* product name */}
                <p>{product.category}</p>
                <p className="text-gray-700 font-medium text-lg truncate w-full">{product.name}</p>

                {/* product rating */}
                <div className="flex items-center gap-0.5">
                    {Array(5).fill("").map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < 4 ? "text-green-600 fill-green-600" : "text-green-200 fill-green-200"}`} />
                    ))}
                    <p>(4)</p>
                </div>


                <div className="flex items-end justify-between mt-3">

                    {/* product price */}
                    <p className="md:text-xl text-base font-medium text-primary">
                        {currency}{product.offerPrice}{" "} <span className="text-gray-500/60 md:text-sm text-xs line-through">{product.price}</span>
                    </p>

                    {/* product add button */}
                    {user && <div className="text-primary" onClick={(e) => { e.stopPropagation() }}>
                        {!cartItems[product._id] ? (
                            <button className="flex items-center justify-center gap-1 bg-primary/10 border border-primary/40 md:w-20 w-16 h-[34px] rounded font-medium cursor-pointer" onClick={() => addToCart(product._id)} >
                                <Plus className="w-4 h-4" />
                                Add
                            </button>
                        ) : (
                            <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-primary/10 rounded select-none">
                                <button onClick={() => { removeToCart(product._id) }} className="cursor-pointer text-md px-2 h-full" >
                                    -
                                </button>
                                <span className="w-5 text-center">{cartItems[product._id]}</span>
                                <button onClick={() => { addToCart(product._id) }} className="cursor-pointer text-md px-2 h-full" >
                                    +
                                </button>
                            </div>
                        )}
                    </div>}
                </div>
            </div>
        </div>
    );
};


export default ProductCard