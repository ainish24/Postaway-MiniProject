let POSTS = [
    {
        id: 1,
        userId: 1,
        caption: "Exploring the beauty of nature! 🌲",
        imageUrl: "/uploads/nature1.jpg"
    },
    {
        id: 2,
        userId: 2,
        caption: "Delicious homemade food 🍕",
        imageUrl: "/uploads/food1.jpg"
    },
    {
        id: 3,
        userId: 3,
        caption: "Aesthetic vibes ✨ #Photography",
        imageUrl: "/uploads/aesthetic1.jpg"
    },
    {
        id: 4,
        userId: 4,
        caption: "Chilling by the beach 🏖️",
        imageUrl: "/uploads/beach1.jpg"
    },
    {
        id: 5,
        userId: 2,
        caption: "New coding setup! 🚀",
        imageUrl: "/uploads/setup1.jpg"
    },
    {
        id: 6,
        userId: 1,
        caption: "Morning coffee, fresh ideas ☕",
        imageUrl: "/uploads/coffee1.jpg"
    },
    {
        id: 7,
        userId: 3,
        caption: "Sunset views from the rooftop 🌇",
        imageUrl: "/uploads/sunset1.jpg"
    },
    {
        id: 8,
        userId: 4,
        caption: "Mountain trekking adventure! 🏔️",
        imageUrl: "/uploads/mountain1.jpg"
    },
    {
        id: 9,
        userId: 2,
        caption: "Weekend getaway with friends! 🛣️",
        imageUrl: "/uploads/travel1.jpg"
    },
    {
        id: 10,
        userId: 1,
        caption: "Just finished a great book 📖",
        imageUrl: "/uploads/book1.jpg"
    }
]

let id =11

const newPost = (userId, caption, imageUrl)=>{
    const newPost={id:id++,userId,caption,imageUrl}
    POSTS.push(newPost)
    return newPost
}

const allPosts=()=>{
    return POSTS
}

const userPosts=(userId)=>{
    const userPosts = POSTS.filter(post=>post.userId==userId)
    return userPosts
}

const postById=(postId)=>{
    const post=POSTS.filter(post=>post.id==postId)
    return post
}

const updatePost=(postId,data)=>{
    POSTS=POSTS.map((post)=>{
        if(post.id==postId){
            return {...post, ...data}
        }
        return post
    })
}

const deletePost=(postId)=>{
    const deletedPost=POSTS.filter(post=>post.id==postId)
    POSTS=POSTS.filter(post=>post.id!=postId)
    return deletedPost
}

export default {newPost, allPosts, userPosts, postById, updatePost, deletePost}