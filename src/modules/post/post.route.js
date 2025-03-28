import express from 'express'
import { verifyToken } from '../../middlewares/jwtAuth.js'
import postControllers from './post.controller.js'
import { upload } from '../../middlewares/uploadMiddleware.js'
import {verifyPostUserMiddleware} from '../../middlewares/postUserVerification.js'
import { newPostValidator, editPostValidator, handleValidation } from '../../middlewares/validationRules.js'
import { loggerMiddleware } from '../../middlewares/loggerMiddleware.js'

const router=express.Router()

router.use(verifyToken)

router.get('/', loggerMiddleware, postControllers.postByCredentials)
router.get('/all', loggerMiddleware, postControllers.getAllPosts)
router.get('/:id', loggerMiddleware, postControllers.postById)
router.post('/',upload.single('postImg'), newPostValidator, handleValidation, loggerMiddleware, postControllers.addPost)
router.delete('/:id',verifyPostUserMiddleware, loggerMiddleware, postControllers.deletePost)
router.put('/:id',upload.single('postImg'), verifyPostUserMiddleware, editPostValidator, handleValidation, loggerMiddleware, postControllers.updatePost)


export default router