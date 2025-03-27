import postModel from "../modules/post/post.model.js";
import { customErrorHandler } from './errorHandlerMiddleware.js'

export const verifyPostUserMiddleware = (req,res,next)=>{
    const postId=req.params.id
    const postUserId=postModel.fetchUserId(postId)
    if(!postUserId){
        throw new customErrorHandler(403,"Post with given ID doesn't exist!")
    }
    const isSameUser=postUserId==req.user.id
    if(!isSameUser){
        throw new customErrorHandler(403,"You are not authorized to alter this post!")
    }
    next()
}
