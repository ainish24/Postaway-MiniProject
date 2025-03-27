import likeModel from "./like.model.js";
import postModel from "../post/post.model.js";
import { customErrorHandler } from "../../middlewares/errorHandlerMiddleware.js";

const getLikesById=(req,res)=>{
    const postId=req.params.postId
    const likes = likeModel.getLikesById(postId)
    if(!likes || likes.length==0){
        throw new customErrorHandler(404,"No likes for the given post!")
    }
    res.status(200).json({
        success:true,
        data:likes
    })
}

const toggleLikes=(req,res)=>{
    const userId=req.user.id
    const postid=req.params.postId
    const isExist=postModel.isPostPresent(postid)
    if(!isExist || isExist.length==0){
        throw new customErrorHandler(404,"No likes for the given post!")
    }
    const likes = likeModel.toggleLikes(userId, postid)
    if(likes.length==0){
        return res.status(200).json({
            success:true,
            message:"No likes on this post yet!"
        })
    }
    res.status(200).json({
        success:true,
        data:likes
    })
}

export default {getLikesById, toggleLikes}