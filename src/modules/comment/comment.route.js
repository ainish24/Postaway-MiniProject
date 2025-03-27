import express from 'express'
import commentController from './comment.controller.js'
import { verifyToken } from '../../middlewares/jwtAuth.js'
import {verifyCommentUserMiddleware} from '../../middlewares/commentUserVerification.js'
import { addCommentValidator, editCommentValidator, handleValidation } from '../../middlewares/validationRules.js'

const router = express.Router()

router.use(verifyToken)

router.get('/:id', commentController.getComments)
router.post('/:id', addCommentValidator, handleValidation, commentController.addComment)
router.delete('/:id', verifyCommentUserMiddleware, commentController.deleteComment)
router.put('/:id', verifyCommentUserMiddleware, editCommentValidator, handleValidation, commentController.updateComment)


export default router