import express from 'express'
import { verifyToken } from '../../middlewares/jwtAuth.js'
import postControllers from './post.controller.js'

const router=express.Router()

router.use(verifyToken)

router.get('/all',postControllers.getAllPosts)
router.get('/:id',postControllers.postById)


export default router