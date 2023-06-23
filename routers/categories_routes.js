import express from 'express'
import * as categories from '../controllers/categories_controller.js'
import { verifyToken } from '../utils/api-utils.js'
const router = express.Router()

router.get('/getCategories', verifyToken, categories.getCategories)
router.post('/createCategories', verifyToken, categories.createCategories)
router.put('/updateCategories', verifyToken, categories.updateCategories)
router.delete('/deleteCategories', verifyToken, categories.deleteCategories)

export default router
