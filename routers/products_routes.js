import express from 'express'
import * as products from '../controllers/products_controller.js'
import { verifyToken } from '../utils/api-utils.js'
const router = express.Router()

router.get('/getProducts', verifyToken, products.getProducts)
router.post('/createProducts', verifyToken, products.createProducts)
router.put('/updateProducts', verifyToken, products.updateProducts)
router.delete('/deleteProducts', verifyToken, products.deleteProducts)

export default router
