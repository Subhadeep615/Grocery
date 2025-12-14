import { asyncHandler } from '../utils/asyncHandler.js';
import jwt from 'jsonwebtoken'

// Prevent javascript to access cookie
const option = {
    httpOnly: true,
    secure: true,
    sameSite: "none", 
}


// Function for Seller Login : /api/admin/login
const loginSeller = asyncHandler(async(req,res)=>{
    
    //get email and password from body
    const { email, password } = req.body;

    // check email or password not empty
    if(!email || !password){
       return res.status(401).json({success: false, message: "email and password are required"}) 
    }

    //check seller details are correct
    if(email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD){
       return res.status(401).json({success: false, message: "Invalid email or password"})    
    }

    // generate token for seller
    const token = jwt.sign({email}, process.env.JWT_SECRET,{expiresIn: '7d'})

    // response to frontend
    return res.cookie('SellerToken',token,option).status(200).json({
        success: true,
        message: "Seller Logged In"
    })

})


// Function for Seller Details : /api/admin/profile
const currentSeller = asyncHandler(async(req,res)=>{

    // response to frontend
    return res.status(200).json({
        success: true,
        message: "Seller fetched"
    })
    
})


// Function for logout user: /api/admin/logout
const logoutSeller = asyncHandler(async(req,res)=>{

    //user logout send to frontend
    return res.clearCookie("SellerToken",option).status(200).json({
        success: true,
        message: "Seller Logged Out"
    })

})


export{   
    loginSeller,currentSeller,logoutSeller
}
