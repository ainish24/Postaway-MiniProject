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

export default {getAllPosts, postById}