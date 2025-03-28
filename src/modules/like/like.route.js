import express from 'express'
import likeController from './like.controller.js'
import { verifyToken } from '../../middlewares/jwtAuth.js'
import { loggerMiddleware } from '../../middlewares/loggerMiddleware.js'

const router = express.Router()
router.use(verifyToken)

router.get('/:postId', loggerMiddleware, likeController.getLikesById)
router.get('/toggle/:postId', loggerMiddleware, likeController.toggleLikes)

export default router