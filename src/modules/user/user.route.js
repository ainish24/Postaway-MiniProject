import express from 'express'
import userController from './user.controller.js'
import { verifyToken } from '../../middlewares/jwtAuth.js'
import { userSignupValidator, userSigninValidator, handleValidation } from '../../middlewares/validationRules.js'

const router = express.Router()

router.get('/',verifyToken,userController.getAllUsers)
router.post('/signup', userSignupValidator, handleValidation, userController.signup)
router.post('/signin', userSigninValidator, handleValidation, userController.signin)

export default router