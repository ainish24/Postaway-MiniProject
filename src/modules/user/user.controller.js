import userModel from './user.model.js'
import jwt from 'jsonwebtoken'

const getAllUsers=(req,res)=>{
    const users = userModel.getAllUsers()
    res.status(200).json({
        success:true,
        data:users
    })
}

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
        throw new customErrorHandler(401,"User with given credentials not found!")
    }
} 

export default{getAllUsers,signup, signin}