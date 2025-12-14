import express from 'express'
import { upload } from '../middleware/multerMiddleware.js';
import { authSeller } from '../middleware/authSellerMiddleware.js'
import { addProduct, listProduct, changeStock } from '../controllers/productController.js'

const router = express.Router()

//router
router.post('/add', authSeller, upload.single('image'), addProduct)
router.get('/list', listProduct)
router.post('/stock', authSeller, changeStock)

export default router;
