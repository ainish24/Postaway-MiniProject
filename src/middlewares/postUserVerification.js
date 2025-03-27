import postModel from "../modules/post/post.model.js";

export const verifyPostUserMiddleware = (req,res,next)=>{
    const postId=req.params.id
    const postUserId=postModel.fetchUserId(postId)
    if(!postUserId){
        return res.status(404).json({
            success:false,
            message:"Post with given ID doesn't exist!"
        })
    }
    const isSameUser=postUserId==req.user.id
    if(!isSameUser){
        return res.status(403).json({
            success:false,
            message:"You are not authorized to alter this post!"
        })
    }
    next()
}
