import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import userRoutes from './src/modules/user/user.route.js'
import postRoutes from './src/modules/post/post.route.js'


const app = express()
dotenv.config()

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use('/api',userRoutes)
app.use('/api/posts',postRoutes)


app.listen(3000, ()=>{
    console.log('Server is listening on 3000!')
})