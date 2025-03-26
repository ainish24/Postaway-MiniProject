import bcrypt from 'bcrypt'

let USERS=[
    {
        id:1,
        name:"Ainish",
        email:"ainish@gmail.com",
        password:bcrypt.hashSync("123",10)
    },
    {
        id:2,
        name:"Harsh",
        email:"harsh@gmail.com",
        password:bcrypt.hashSync("123",10)
    },
    {
        id:3,
        name:"Manish",
        email:"manish@gmail.com",
        password:bcrypt.hashSync("123",10)
    },
    {
        id:4,
        name:"Dhanish",
        email:"dhanish@gmail.com",
        password:bcrypt.hashSync("123",10)
    },
]
let id=5

const getAllUsers=()=>{
    return USERS
}

const addUser=(data)=>{
    const {name, email, password}=data
    const encryptedPassword=bcrypt.hashSync(password,10)
    const newUser={id:id++,name,email,password:encryptedPassword}
    USERS.push(newUser)
    return newUser
}

const checkUser=(data)=>{
    const {email, password}=data
    let doesPasswordMatch
    let isExist=false
    USERS.forEach((user)=>{
        doesPasswordMatch=bcrypt.compareSync(password, user.password)
        if(user.email==email && doesPasswordMatch){
            isExist=user
        }
    })
    return isExist
}

export default {getAllUsers, addUser, checkUser}