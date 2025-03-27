import express from 'express'
import commentController from './comment.controller.js'
import { verifyToken } from '../../middlewares/jwtAuth.js'
import {verifyCommentUserMiddleware} from '../../middlewares/commentUserVerification.js'

const router = express.Router()

router.use(verifyToken)

router.get('/:id', commentController.getComments)
router.post('/:id', commentController.addComment)
router.delete('/:id', verifyCommentUserMiddleware, commentController.deleteComment)
router.put('/:id', verifyCommentUserMiddleware, commentController.updateComment)


export default router