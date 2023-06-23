import express from 'express'
import * as orders from '../controllers/orders_controller.js'
import { verifyToken } from '../utils/api-utils.js'
const router = express.Router()

router.get('/getOrders', verifyToken, orders.getOrders)
router.post('/createOrders', verifyToken, orders.createOrders)
router.put('/updateOrders', verifyToken, orders.updateOrders)
router.delete('/deleteOrders', verifyToken, orders.deleteOrders)

export default router
