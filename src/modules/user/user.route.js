import express from 'express'
import userController from './user.controller.js'
import { verifyToken } from '../../middlewares/jwtAuth.js'
import { userSignupValidator, userSigninValidator, handleValidation } from '../../middlewares/validationRules.js'
import { loggerMiddleware } from '../../middlewares/loggerMiddleware.js'

const router = express.Router()

router.get('/',verifyToken,userController.getAllUsers)
router.post('/signup', userSignupValidator, handleValidation, loggerMiddleware, userController.signup)
router.post('/signin', userSigninValidator, handleValidation, loggerMiddleware, userController.signin)

export default router