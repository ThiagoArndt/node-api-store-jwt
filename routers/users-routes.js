import express from 'express'
import * as users from '../controllers/users_controller.js'

const router = express.Router()

router.post('/registerUser', users.registerUser)
router.post('/loginUser', users.loginUser)

export default router
