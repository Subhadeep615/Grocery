import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'

const Footer = () => {

    const { navigate } = useContext(ShopContext)

    return (
        <div className="mt-10 bg-primary/10">
            <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 px-6 md:px-16 lg:px-24 xl:px-32 py-4 my-10 mt-14 text-sm">
                <div>
                    <div className="flex gap-2 items-center">
                        <img src={assets.brand_logo} className="w-15" alt="" />
                        <h1 className="text-2xl"><span className="font-bold">Zippy</span><span className="italic font-light">Basket</span></h1>
                    </div>
                    <p className="w-full md:w-2/3 text-gray-600 my-3 mx-5 ">
                        ZippyBasket delivers fresh groceries and essentials at unbeatable prices.<br />
                        Shop conveniently online and enjoy fast, reliable delivery right to your doorstep daily.
                    </p>
                </div>

                <div>
                    <p className="text-xl font-medium mb-5">COMPANY</p>
                    <ul className="flex flex-col gap-1 text-gray-600">
                        <li onClick={() => navigate('/')}>Home</li>
                        <li onClick={() => navigate('/about')}>About us</li>
                        <li>Delivery </li>
                        <li>Privacy policy</li>
                    </ul>
                </div>

                <div>
                    <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
                    <ul className="flex flex-col gap-1 text-gray-600">
                        <li>Tel: (033) 2456-7891</li>
                        <li>Email: support@ZippyBasket.com</li>
                        <button onClick={() => navigate('/seller')} className="bg-white text-base text-primary-dull border border-primary-dull w-1/3 py-0.5 rounded-full mt-5">
                            Admin
                        </button>
                    </ul>
                </div>
            </div>

            <div>
                <hr />
                <p className="py-5 text-center ">© 2025 ZippyBasket by Subhadeep Majhi. All Rights Reserved.</p>
            </div>

        </div>
    )
}

export default Footer
