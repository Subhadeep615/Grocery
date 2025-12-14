import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'

const About = () => {
    return (
        <div>
            <div className="text-2xl text-center pt-8">
                <Title text={"ABOUT US"} />
            </div>

            <div className="my-10 flex flex-col lg:flex-row gap-16">
                <img className="w-full lg:max-w-[450px] rounded" src={assets.about_img} alt="" />
                <div className="flex flex-col justify-center gap-6 lg:w-2/4 text-gray-600">

                    <p>At ZippyBasket, we make grocery shopping easier than ever. No more long queues or last-minute rush—just fresh fruits, vegetables, dairy, and daily essentials delivered straight to your doorstep. From pantry staples to snacks and household must-haves, everything you need is now just a few clicks away. With simple navigation, safe payments, and quick delivery, ZippyBasket turns grocery shopping into a smooth and convenient experience.</p>

                    <b className="text-gray-800 ">Our Mission</b>

                    <p>Our mission is to bring freshness and value to every household. We focus on quality, affordability, and reliability so you can shop with confidence every time. By working with trusted farmers, suppliers, and brands, we make sure you always get the best. At ZippyBasket, we here to save your time, keep your kitchen stocked, and make everyday living a little easier.</p>

                </div>
            </div>
            <div className="text-xl py-4">
                <Title text={"WHY CHOOSE US"} />
            </div>
            <div className="flex flex-col lg:flex-row text-sm mb-20">

                <div className="border border-gray-300 px-10 lg:px-16 py-20 flex flex-col gap-5">
                    <b className="text-base">Farm-to-Home Freshness:</b>
                    <p className="text-gray-600">We partner directly with trusted farmers and suppliers to bring you the freshest produce, dairy, and daily essentials—so your family enjoys nutrition at its best.</p>
                </div>

                <div className="border border-gray-300 px-10 lg:px-16 py-20 flex flex-col gap-5">
                    <b className="text-base">Smart Savings, Every Day:</b>
                    <p className="text-gray-600">With competitive prices, seasonal offers, and value packs, ZippyBasket makes sure your grocery shopping is not only convenient but also budget-friendly.</p>
                </div>

                <div className="border border-gray-300 px-10 lg:px-16 py-20 flex flex-col gap-5">
                    <b className="text-base">Reliable Doorstep Delivery:</b>
                    <p className="text-gray-600">From early-morning milk runs to same-day essentials, our delivery service is fast, safe, and designed to fit your lifestyle.</p>
                </div>
            </div>
        </div>
    )
}

export default About
