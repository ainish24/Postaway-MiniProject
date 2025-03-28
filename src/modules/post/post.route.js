import express from 'express'
import { verifyToken } from '../../middlewares/jwtAuth.js'
import postControllers from './post.controller.js'
import { upload } from '../../middlewares/uploadMiddleware.js'
import {verifyPostUserMiddleware} from '../../middlewares/postUserVerification.js'
import { newPostValidator, editPostValidator, handleValidation } from '../../middlewares/validationRules.js'
import { loggerMiddleware } from '../../middlewares/loggerMiddleware.js'
import { paginationMiddleware } from '../../middlewares/paginationMiddleware.js'

const router=express.Router()

router.use(verifyToken)
router.use(paginationMiddleware)

//mention query parameter ?sort=true for sorted data 

router.get('/', loggerMiddleware, postControllers.postByCredentials) // add ?filterCaption query to filter posts based on caption
router.get('/all', loggerMiddleware, postControllers.getAllPosts)
router.get('/:id', loggerMiddleware, postControllers.postById)
router.get('/archiveToggle/:id', loggerMiddleware, verifyPostUserMiddleware, postControllers.archivePost)
router.get('/bookmarkToggle/:id', loggerMiddleware,  postControllers.bookmarkPost)
router.post('/',upload.single('postImg'), newPostValidator, handleValidation, loggerMiddleware, postControllers.addPost) // add ?draft=true tp add it to draft
router.delete('/:id',verifyPostUserMiddleware, loggerMiddleware, postControllers.deletePost)
router.put('/:id',upload.single('postImg'), verifyPostUserMiddleware, editPostValidator, handleValidation, loggerMiddleware, postControllers.updatePost)


export default router