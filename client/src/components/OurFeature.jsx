import React from 'react'
import { assets } from '../assets/assets'
import { Coins, Heart, Leaf, Truck } from 'lucide-react'

const OurFeature = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 mt-10 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700" >

            <div>
                <Truck className="w-12 h-12 m-auto mb-5 text-gray-900" />
                <p className="font-semibold">Fastest Delivery</p>
                <p className="text-gray-400 ">Groceries delivered in under 30 minutes.</p>
            </div>

            <div>
                <Leaf className="w-12 h-12 m-auto mb-5 text-gray-900" />
                <p className="font-semibold">Freshness Guaranteed</p>
                <p className="text-gray-400 ">Fresh produce straight from the source.</p>
            </div>

            <div>
                <Coins className="w-12 h-12 m-auto mb-5 text-gray-900" />
                <p className="font-semibold">Affordable Prices</p>
                <p className="text-gray-400 ">Quality groceries at unbeatable prices.</p>
            </div>

            <div>
                <Heart className="w-12 h-12 m-auto mb-5 text-gray-900 fill-gray-900" />
                <p className="font-semibold">Trusted by Thousands</p>
                <p className="text-gray-400 ">Loved by 10,000+ happy customers.</p>
            </div>

        </div>
    )
}

export default OurFeature
