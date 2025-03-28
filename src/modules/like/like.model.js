export let LIKES = [
    { id: 1, userId: 2, postId: 1 },
    { id: 2, userId: 3, postId: 1 },
    { id: 3, userId: 4, postId: 1 },
    { id: 4, userId: 1, postId: 1 },
    
    { id: 5, userId: 4, postId: 3 },
    { id: 6, userId: 2, postId: 3 },

    { id: 7, userId: 3, postId: 4 },
    { id: 8, userId: 1, postId: 4 },
    { id: 9, userId: 2, postId: 4 },

    { id: 10, userId: 1, postId: 5 },
    { id: 11, userId: 3, postId: 5 },
    { id: 12, userId: 4, postId: 5 },

    { id: 13, userId: 2, postId: 6 },

    { id: 14, userId: 4, postId: 7 },
    { id: 15, userId: 2, postId: 7 },
    { id: 16, userId: 3, postId: 7 },

    { id: 17, userId: 1, postId: 8 },

    { id: 18, userId: 3, postId: 9 },
    { id: 19, userId: 4, postId: 9 },
    { id: 20, userId: 1, postId: 9 },

    { id: 21, userId: 2, postId: 10 },
    { id: 22, userId: 4, postId: 10 },
    { id: 23, userId: 1, postId: 10 }
];

let id=24

const getLikesById=(likeId)=>{
    const likes = LIKES.filter(like=>like.postId==likeId)
    return likes
}

const toggleLikes=(userId, postId)=>{
    let isExist = false
    let existId=null
    LIKES.forEach((like)=>{
        if(like.userId==userId && like.postId==postId){
            isExist=true
            existId=like.id
        }
    })
    if(isExist){
        LIKES=LIKES.filter(like=>like.id!=existId)
        LIKES=LIKES.map((like)=>{
            if(like.id>existId){
                return {...like, id:--like.id}
            }
            return like
        })
        --id
        return LIKES.filter(like=>like.postId==postId)
    }
    const newLike={id:id++,userId,postId}
    LIKES.push(newLike)
    return LIKES.filter(like=>like.postId==postId)
}

export default {getLikesById, toggleLikes}