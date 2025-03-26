import express from 'express'
import userController from './user.controller.js'
import { verifyToken } from '../../middlewares/jwtAuth.js'

const router = express.Router()

router.get('/',verifyToken,userController.getAllUsers)
router.post('/signup',userController.signup)
router.post('/signin',userController.signin)

export default router