import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import userRoutes from './src/modules/user/user.route.js'
import postRoutes from './src/modules/post/post.route.js'
import commentRoutes from './src/modules/comment/comment.route.js'
import likeRoutes from './src/modules/like/like.route.js'
import {customErrorHandler, errorHandlerMiddleware} from './src/middlewares/errorHandlerMiddleware.js'
import swaggerUi from 'swagger-ui-express';
import { readFile } from 'fs/promises';
import cors from 'cors';


const swaggerJON = JSON.parse(
    await readFile(new URL('./documentation/swagger.json', import.meta.url))
  );

const app = express()
dotenv.config()

app.use(cors({
    origin: '*',
    credentials: true,
}));
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use('/api',userRoutes)
app.use('/api/posts',postRoutes)
app.use('/api/comments',commentRoutes)
app.use('/api/likes', likeRoutes)
app.use('/api/docs',swaggerUi.serve, swaggerUi.setup(swaggerJON))

app.get('/',(req,res)=>{
    res.status(200).json({
        success:true,
        message:"Welcome to Postaway-A social media API"
    })
})

app.all('*',(req,res)=>{
    throw new customErrorHandler(404,"Not Found!")
})

app.use(errorHandlerMiddleware)
app.listen(3000, ()=>{
    console.log('Server is listening on 3000!')
})