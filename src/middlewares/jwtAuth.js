import jwt from 'jsonwebtoken'

export const verifyToken=(req,res,next)=>{
    const token = req.cookies.token
    try {
        const user=jwt.verify(token,process.env.JWT_PRIVATE_KEY)
        req.user=user
        next()
    } catch (error) {
        res.status(401).json({
            success:false,
            message:"You must be logged in to access this resource. Please log in and try again."
        })
    }

}