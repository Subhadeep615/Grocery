import express from 'express'
import { authSeller } from '../middleware/authSellerMiddleware.js'
import { loginSeller, currentSeller, logoutSeller } from '../controllers/adminController.js'

const router = express.Router()

// seller router
router.post('/login', loginSeller)
router.get('/profile', authSeller, currentSeller)
router.get('/logout', authSeller, logoutSeller)

export default router;
