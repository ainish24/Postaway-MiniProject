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
        message:"Post added successfully",
        data:newPost
    })
}

const deletePost = (req,res)=>{
    const deletedPost=postModel.deletePost(req.params.id)
    if(!deletedPost || deletedPost.length==0){
        return res.status(404).json({
            success:false,
            message:"Post with given ID doesn't exist!"
        })
    }
    res.status(200).json({
        success:true,
        message:"Post deleted successfully",
        data:deletedPost
    })
}

const updatePost=(req,res)=>{
    if(!postModel.isPostPresent(req.params.id) || postModel.isPostPresent(req.params.id).length==0){
        return res.status(404).json({
            success:false,
            message:"Post with given ID doesn't exist!"
        })
    }
    let postData={}
    if (req.file){
        const imageUrl=`/uploads/${req.file.filename}`
        postData={...postData, imageUrl}
    }
    const {caption}= req.body
    if(caption){
        postData={...postData, caption}
    }
    const updatedPost=postModel.updatePost(req.params.id, postData)
    res.status(200).json({
        success:true,
        message:"Post updated successfully",
        data:updatedPost
    })
}

export default {getAllPosts, postById, postByCredentials, addPost, deletePost, updatePost}