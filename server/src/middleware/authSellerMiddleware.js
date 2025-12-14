import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken'

export const authSeller = asyncHandler(async (req, res, next) => {
    try {
        // Accept token from cookie or Authorization header
        const SellerToken = req.cookies?.SellerToken;

        if (!SellerToken) {
            return res.status(401).json({ success: false, message: "Not Authorized: no token provided" });
        }

        const decodedToken = jwt.verify(SellerToken, process.env.JWT_SECRET)

        if (decodedToken?.email === process.env.ADMIN_EMAIL) {
            return next();
        }
    } catch (error) {
        return res.status(401).json({ success: false, message: error?.message || "Not Authorized, Invalid Access Token" })
    }
});