import express from 'express'
import { verifyToken } from '../../middlewares/jwtAuth.js'
import postControllers from './post.controller.js'
import { upload } from '../../middlewares/uploadMiddleware.js'

const router=express.Router()

router.use(verifyToken)

router.get('/',postControllers.postByCredentials)
router.get('/all',postControllers.getAllPosts)
router.get('/:id',postControllers.postById)
router.post('/',upload.single('postImg'),postControllers.addPost)


export default router