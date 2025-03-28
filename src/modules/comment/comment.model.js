export let COMMENTS = [
    { id: 1, userId: 2, postId: 1, content: "Wow, amazing view! 🌿" },
    { id: 2, userId: 3, postId: 1, content: "Nature is so beautiful!" },
    
    { id: 3, userId: 1, postId: 3, content: "That looks delicious! 🍕" },
    { id: 4, userId: 4, postId: 3, content: "Love the aesthetic vibes! ✨" },
    { id: 5, userId: 2, postId: 3, content: "Absolutely love this shot! 📸" },

    { id: 6, userId: 3, postId: 4, content: "Wish I was there! 🏖️" },
    { id: 7, userId: 1, postId: 4, content: "Is this a recent trip? Looks fun! 🎒" },
    { id: 8, userId: 4, postId: 4, content: "Amazing! Where is this place? 🌍" },

    { id: 9, userId: 1, postId: 5, content: "Nice setup! What's your PC build? 🔥" },
    { id: 10, userId: 3, postId: 5, content: "That gaming setup is crazy! 🎮" },

    { id: 11, userId: 2, postId: 6, content: "Nothing beats a good morning coffee! ☕" },

    { id: 12, userId: 4, postId: 7, content: "Sunsets are always magical! 🌅" },
    { id: 13, userId: 2, postId: 7, content: "That sunset is unreal! 🌇" },
    { id: 14, userId: 3, postId: 7, content: "I wish I could see this in person! 😍" },
    { id: 15, userId: 1, postId: 7, content: "Trekking is such a thrill! 🏔️" },

    { id: 16, userId: 3, postId: 9, content: "Road trips are the best! 🚗" },
    { id: 17, userId: 4, postId: 9, content: "Long drives are the best therapy! 🚙💨" },

    { id: 18, userId: 2, postId: 10, content: "This is giving major travel goals! ✈️" },
    { id: 19, userId: 4, postId: 10, content: "Dreaming of a vacation like this! 🌍💙" },
    { id: 20, userId: 1, postId: 10, content: "Where was this taken? Looks amazing! 😃" }
];

let id=21


const getCommentsByPostId=(postId)=>{
    const comments=COMMENTS.filter(comment=>comment.postId==postId)
    return comments
}

const addComment=(postId, userId, content)=>{
    const newComment={id:id++, userId, postId, content}
    COMMENTS.push(newComment)
    return newComment
}

const deleteComment=(commentId)=>{
    const deletedComment= COMMENTS.filter(comment=>comment.id==commentId)
    COMMENTS=COMMENTS.filter(comment=>comment.id!=commentId)
    return deletedComment
}

const updateComment=(commentId, newComment)=>{
    COMMENTS=COMMENTS.map((comment)=>{
        if(comment.id==commentId){
            return {...comment, content:newComment}
        }
        return comment
    })
    return fetchCommentById(commentId)
}

const fetchCommentById=(commentId)=>{
    return COMMENTS.filter(comment=>comment.id==commentId)
}

const fetchUserId=(commentId)=>{
    const comment=COMMENTS.filter(comment=>comment.id==commentId)
    if(!comment || comment.length==0){
        return false
    }
    const userId=comment[0].userId
    return userId
}

const fetchPostId=(commentId)=>{
    const comment=COMMENTS.filter(comment=>comment.id==commentId)
    const postId=comment[0].postId
    return postId
}

export default {getCommentsByPostId, addComment, deleteComment, updateComment, fetchUserId, fetchPostId, fetchCommentById}