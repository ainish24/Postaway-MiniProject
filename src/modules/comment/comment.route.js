import express from 'express'
import commentController from './comment.controller.js'
import { verifyToken } from '../../middlewares/jwtAuth.js'
import {verifyCommentUserMiddleware} from '../../middlewares/commentUserVerification.js'
import { addCommentValidator, editCommentValidator, handleValidation } from '../../middlewares/validationRules.js'
import { loggerMiddleware } from '../../middlewares/loggerMiddleware.js'
import { paginationMiddleware } from '../../middlewares/paginationMiddleware.js'

const router = express.Router()

router.use(verifyToken)

router.get('/:id', loggerMiddleware, commentController.getComments)
router.post('/:id', addCommentValidator, handleValidation, loggerMiddleware, commentController.addComment)
router.delete('/:id', verifyCommentUserMiddleware, loggerMiddleware, commentController.deleteComment)
router.put('/:id', verifyCommentUserMiddleware, editCommentValidator, handleValidation, loggerMiddleware, commentController.updateComment)


export default router