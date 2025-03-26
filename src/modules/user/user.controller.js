import userModel from './user.model.js'
import jwt from 'jsonwebtoken'

const signup=(req,res)=>{
    const data = req.body
    const user=userModel.addUser(data)
    
    res.status(201).json({
        success:true,
        data:user
    })
} 

const signin=(req,res)=>{
    const data=req.body
    const user=userModel.checkUser(data)
    if(user){
        const token = jwt.sign(user,process.env.JWT_PRIVATE_KEY,{expiresIn:'10h'})
        res.cookie('token',token,{
            maxAge:10*60*60*1000
        })
        return res.status(200).json({
            success:true,
            data:user
        })
    }else{
        return res.status(401).json({
            success:false,
            message:"user with given credentials not found"
        })
    }
} 

export default{signup, signin}