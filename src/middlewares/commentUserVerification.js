import commentModel from "../modules/comment/comment.model.js";
import postModel from "../modules/post/post.model.js";

export const verifyCommentUserMiddleware=(req,res,next)=>{
    const commentId= req.params.id
    const commentUserId= commentModel.fetchUserId(commentId)
    if(!commentUserId){
        return res.status(404).json({
            success:false,
            message:"Comment with given ID doesn't exist!"
        })
    }
    const isSameUser = commentUserId==req.user.id
    const postId = commentModel.fetchPostId(commentId)
    const postUserId=postModel.fetchUserId(postId)
    const isPostOwner = postUserId==req.user.id
    const condition = req.method==="DELETE" ? !isSameUser && !isPostOwner : !isSameUser
    if(condition){
        return res.status(403).json({
            success:false,
            message:"You are not authorized to alter this comment!"
        })
    }
    next()
}