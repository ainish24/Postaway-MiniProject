import postModel from "./post.model.js";

import { customErrorHandler } from "../../middlewares/errorHandlerMiddleware.js";

const getAllPosts=(req,res)=>{
    const posts=postModel.allPosts()
    if(req.query.sort){
        const mergedArray=postModel.mergedArray(posts)
        const sortedPosts=postModel.sortedPosts(mergedArray)
        return res.status(200).json({
            success:true,
            data:req.paginate(sortedPosts)
        })
    }
    res.status(200).json({
        success:true,
        data:req.paginate(posts)
    })
}

const postById=(req,res)=>{
    const post = postModel.postById(req.params.id)
    if(!post || post.length==0){
        throw new customErrorHandler(404,"Post with given ID doesn't exist!")
    }
    res.status(200).json({
        success:true,
        data:req.paginate(post)
    })
}

const postByCredentials=(req,res)=>{
    if(req.query.filterCaption){
        const {filterCaption} = req.query
        const filteredPosts=postModel.filterPost(filterCaption)
        if(filteredPosts.length==0){
            throw new customErrorHandler(404,"No posts match your search")
        }
        return res.status(200).json({
            success:true,
            data:req.paginate(filteredPosts)
        })
    }
    const userId=req.user.id
    const posts=postModel.userPosts(userId)
    if(posts.length==0){
        throw new customErrorHandler(404,"This user has no posts!")
    }
    if(req.query.sort){
        const mergedArray=postModel.mergedArray(posts)
        const sortedPosts=postModel.sortedPosts(mergedArray)
        return res.status(200).json({
            success:true,
            data:req.paginate(sortedPosts)
        })
    }
    res.status(200).json({
        success:true,
        data:req.paginate(posts)
    })
}

const addPost=(req,res)=>{
    const userId=req.user.id
    const imgUrl=`/uploads/${req.file.filename}`
    const {caption}= req.body
    if(req.query.draft){
        const newPost=postModel.addToDrafts(userId, caption, imgUrl)
        return res.status(200).json({
            success:true,
            message:"Post added to drafts successfully",
            data:newPost
        })
    }
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
        throw new customErrorHandler(404,"Post with given ID doesn't exist!")
    }
    res.status(200).json({
        success:true,
        message:"Post deleted successfully",
        data:deletedPost
    })
}

const updatePost=(req,res)=>{
    if(!postModel.isPostPresent(req.params.id) || postModel.isPostPresent(req.params.id).length==0){
        throw new customErrorHandler(404,"Post with given ID doesn't exist!")
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

const archivePost=(req,res)=>{
    const post = postModel.isPostPresent(req.params.id)
    if(!post || post.length==0){
        throw new customErrorHandler(404,"Post with given ID doesn't exist!")
    }
    const archived=postModel.archivePost(Number(req.params.id))
    res.status(200).json({
        success:true,
        data:archived
    })
}

const bookmarkPost=(req,res)=>{
    const userId=req.user.id
    const postId=Number(req.params.id)
    const post = postModel.isPostPresent(req.params.id)
    if(!post || post.length==0){
        throw new customErrorHandler(404,"Post with given ID doesn't exist!")
    }
    const bookmarks=postModel.addBookmark(userId,postId)
    res.status(200).json({
        success:true,
        data:bookmarks
    })
}

export default {getAllPosts, postById, postByCredentials, addPost, deletePost, updatePost, archivePost, bookmarkPost}