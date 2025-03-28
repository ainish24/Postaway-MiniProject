import { LIKES } from "../like/like.model.js";
import { COMMENTS } from "../comment/comment.model.js";
let POSTS = [
    {
        id: 1,
        userId: 1,
        caption: "Exploring the beauty of nature! 🌲",
        imageUrl: "/uploads/nature1.jpg",
        date: "Mon Mar 10 2025 14:30:00 GMT+0530 (India Standard Time)"
    },
    {
        id: 2,
        userId: 2,
        caption: "Delicious homemade food 🍕",
        imageUrl: "/uploads/food1.jpg",
        date: "Wed Feb 05 2025 18:45:00 GMT+0530 (India Standard Time)"
    },
    {
        id: 3,
        userId: 3,
        caption: "Aesthetic vibes ✨ #Photography",
        imageUrl: "/uploads/aesthetic1.jpg",
        date: "Sat Jan 20 2025 09:15:00 GMT+0530 (India Standard Time)"
    },
    {
        id: 4,
        userId: 4,
        caption: "Chilling by the beach 🏖️",
        imageUrl: "/uploads/beach1.jpg",
        date: "Wed Apr 02 2025 12:00:00 GMT+0530 (India Standard Time)"
    },
    {
        id: 5,
        userId: 2,
        caption: "New coding setup! 🚀",
        imageUrl: "/uploads/setup1.jpg",
        date: "Tue Mar 25 2025 16:10:00 GMT+0530 (India Standard Time)"
    },
    {
        id: 6,
        userId: 1,
        caption: "Morning coffee, fresh ideas ☕",
        imageUrl: "/uploads/coffee1.jpg",
        date: "Wed Feb 12 2025 07:30:00 GMT+0530 (India Standard Time)"
    },
    {
        id: 7,
        userId: 3,
        caption: "Sunset views from the rooftop 🌇",
        imageUrl: "/uploads/sunset1.jpg",
        date: "Tue Jan 28 2025 19:00:00 GMT+0530 (India Standard Time)"
    },
    {
        id: 8,
        userId: 4,
        caption: "Mountain trekking adventure! 🏔️",
        imageUrl: "/uploads/mountain1.jpg",
        date: "Tue Apr 15 2025 10:20:00 GMT+0530 (India Standard Time)"
    },
    {
        id: 9,
        userId: 2,
        caption: "Weekend getaway with friends! 🛣️",
        imageUrl: "/uploads/travel1.jpg",
        date: "Tue Mar 18 2025 14:50:00 GMT+0530 (India Standard Time)"
    },
    {
        id: 10,
        userId: 1,
        caption: "Just finished a great book 📖",
        imageUrl: "/uploads/book1.jpg",
        date: "Fri Feb 07 2025 21:10:00 GMT+0530 (India Standard Time)"
    }
];


let archived=[]
let drafts=[]
let bookmarks=[]

let id =11
let draftId=1
let bookmarkId=1

const newPost = (userId, caption, imageUrl)=>{
    const date=new Date().toString()
    const newPost={id:id++,userId,caption,imageUrl,date}
    POSTS.push(newPost)
    return newPost
}

const allPosts=()=>{
    return POSTS.filter(post=>!(isArchived(post.id)))
}

const userPosts=(userId)=>{
    const userPosts = POSTS.filter(post=>post.userId==userId && !(isArchived(post.id)))
    return userPosts
}

const postById=(postId)=>{
    const post=POSTS.filter(post=>post.id==postId && !(isArchived(post.id)))
    return post
}

const updatePost=(postId,data)=>{
    const date=new Date().toString()
    POSTS=POSTS.map((post)=>{
        if(post.id==postId){
            return {...post, ...data, date}
        }
        return post
    })

    return postById(postId)
}

const deletePost=(postId)=>{
    const deletedPost=POSTS.filter(post=>post.id==postId)
    POSTS=POSTS.filter(post=>post.id!=postId)
    return deletedPost
}

const filterPost=(filterCaption)=>{
    let filteredPosts = POSTS.filter(post=>post.caption.toLowerCase().includes(filterCaption.toLowerCase()) && !(isArchived(post.id)))
    return filteredPosts
}

const archivePost=(postId)=>{
    if(!archived.includes(postId)){
        archived.push(postId)
    }else{
        archived=archived.filter(id=>id!=postId)
    }
    return archived
}

const isPostPresent=(postId)=>{
    const isExist=POSTS.filter(post=>post.id==postId)
    return isExist
}

const isArchived=(postId)=>{
    return !!archived.includes(postId)
}

const addToDrafts = (userId, caption, imageUrl)=>{
    const date=new Date().toString()
    const newPost={draftId:draftId++,userId,caption,imageUrl, date}
    drafts.push(newPost)
    return newPost
}

const fetchUserId=(postId)=>{
    const post=POSTS.filter(post=>post.id==postId)
    if(!post || post.length==0){
        return false
    }
    const userId=post[0].userId
    return userId
}

const mergedArray=(toBeMerged)=>{
    return toBeMerged.map(post => {
        const likeCount = LIKES.filter(like => like.postId === post.id).length;
        const commentCount = COMMENTS.filter(comment => comment.postId === post.id).length;
        return {
            ...post,
            likes: likeCount,
            comments: commentCount,
            engagement: likeCount + commentCount
        };
    });
}

const sortedPosts=(sortingArray)=>{
    return sortingArray.sort((a, b) => {
        if (b.engagement !== a.engagement) {
            return b.engagement - a.engagement;
        }
        return new Date(a.date) - new Date(b.date);
    });
}

const addBookmark=(userId, postId)=>{
    if(bookmarks.filter(bookmark=>bookmark.userId==userId && bookmark.postId==postId).length!=0){
        const bookmarkedId= bookmarks.filter(bookmark=>bookmark.userId==userId && bookmark.postId==postId)[0].id
        bookmarks=bookmarks.filter(bookmark=>!(bookmark.userId==userId && bookmark.postId==postId))
        bookmarks=bookmarks.map((bookmark)=>{
            if(bookmark.id>bookmarkedId){
                return {...bookmark, id:--bookmark.id}
            }
            return bookmark
        })
        --bookmarkId
    }else{
        const bookmark={id:bookmarkId++,userId,postId}
        bookmarks.push(bookmark)
    }
    return bookmarks.filter(bookmark=>bookmark.userId==userId)
}

export default {newPost, allPosts, userPosts, postById, updatePost, deletePost, filterPost, archivePost, isPostPresent, isArchived, addToDrafts, fetchUserId, mergedArray, sortedPosts, addBookmark}