import userModel from "../user/user.model.js";
import postModel from "./post.model.js";

const getAllPosts=(req,res)=>{
    const posts=postModel.allPosts()
    res.status(200).json({
        success:true,
        data:posts
    })
}

const postById=(req,res)=>{
    const post = postModel.postById(req.params.id)
    if(!post || post.length==0){
        return res.status(404).json({
            success:false,
            message:"Post with given ID doesn't exist!"
        })
    }
    res.status(200).json({
        success:true,
        data:post
    })
}

const postByCredentials=(req,res)=>{
    const userId=req.user.id
    console.log(userId)
    const posts=postModel.userPosts(userId)
    if(posts.length==0){
        return res.status(404).json({
            success:false,
            message:"This user has no posts"
        })
    }
    res.status(200).json({
        success:true,
        data:posts
    })
}

const addPost=(req,res)=>{
    const userId=req.user.id
    const imgUrl=`/uploads/${req.file.filename}`
    const {caption}= req.body
    const newPost=postModel.newPost(userId, caption, imgUrl)
    res.status(200).json({
        success:true,
        data:newPost
    })
}

export default {getAllPosts, postById, postByCredentials, addPost}