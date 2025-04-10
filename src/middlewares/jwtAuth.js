import jwt from 'jsonwebtoken'
import { customErrorHandler } from './errorHandlerMiddleware.js'

export const verifyToken=(req,res,next)=>{
    const token = req.cookies.token
    try {
        const user=jwt.verify(token,process.env.JWT_PRIVATE_KEY)
        req.user=user
        next()
    } catch (error) {
        console.log(error.message)
        throw new customErrorHandler(401,"You must be logged in to access this resource. Please log in and try again.")
    }

}