import express from 'express'
import likeController from './like.controller.js'
import { verifyToken } from '../../middlewares/jwtAuth.js'

const router = express.Router()
router.use(verifyToken)

router.get('/:postId', likeController.getLikesById)
router.get('/toggle/:postId', likeController.toggleLikes)

export default router