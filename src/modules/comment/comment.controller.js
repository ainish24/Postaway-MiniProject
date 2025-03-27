import commentModel from './comment.model.js'
import postModel from '../post/post.model.js'

const getComments=(req,res)=>{
    const postId=req.params.id
    const isPostPresent=postModel.isPostPresent(postId)
    if(!isPostPresent || isPostPresent.length==0){
        return res.status(404).json({
            success:false,
            message:"Post with the given id doesn't exist!"
        })
    }
    const comments=commentModel.getCommentsByPostId(postId)
    if(!comments || comments.length==0){
        return res.status(200).json({
            success:false,
            message:"No comments on this post!"
        })
    }
    res.status(200).json({
        success:true,
        data:comments
    })
}

const addComment=(req,res)=>{
    const postId=req.params.id
    const isPostPresent=postModel.isPostPresent(postId)
    if(!isPostPresent || isPostPresent.length==0){
        return res.status(404).json({
            success:false,
            message:"Post with the given id doesn't exist!"
        })
    }
    const userId=req.user.id
    const content=req.body.comment
    const newComment=commentModel.addComment(postId, userId, content)
    res.status(200).json({
        success:true,
        data:newComment
    })
}

const deleteComment=(req,res)=>{
    const commentId=req.params.id
    const deletedComment=commentModel.deleteComment(commentId)
    res.status(200).json({
        success:true,
        message:"Comment deleted successfully",
        data:deletedComment
    })
}

const updateComment=(req,res)=>{
    const commentId=req.params.id
    const content=req.body.comment
    const updatedComment=commentModel.updateComment(commentId, content)
    res.status(200).json({
        success:true,
        message:"Comment updated successfully",
        data:updatedComment
    })
}


export default {getComments, addComment, deleteComment, updateComment}