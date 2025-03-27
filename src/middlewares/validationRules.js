import { validationResult, body } from "express-validator";
import { customErrorHandler } from "./errorHandlerMiddleware.js";

const userSignupValidator=[
    body('name').notEmpty().withMessage("Name cannot be empty"),
    body('email').notEmpty().withMessage("Email cannot be empty").isEmail().withMessage("Enter a valid email"),
    body('password').notEmpty().withMessage("Password cannopt be empty")
]

const userSigninValidator=[
    body('email').notEmpty().withMessage("Email cannot be empty").isEmail().withMessage("Enter a valid email"),
    body('password').notEmpty().withMessage("Password cannopt be empty")
]

const newPostValidator=[
    body('caption').notEmpty().withMessage("Please enter a caption!"),
    body('file').custom((_,{req})=>{
        if(!req.file){
            throw new Error("Kindly upload a  file!")
        }
        if(/\s/.test(req.file.originalname)){
            throw new Error("Filename contains spaces. Please rename the file and remove spaces before uploading.")
        }
        return true
    })
]

const editPostValidator=[
    body('caption').optional().notEmpty().withMessage("Please enter a caption!"),
    body('file').custom((_,{req})=>{
        if(req.file){
            if(/\s/.test(req.file.originalname)){
                throw new Error("Filename contains spaces. Please rename the file and remove spaces before uploading.")
            }
        }
        return true
    })

]

const addCommentValidator=[
    body('comment').notEmpty().withMessage('Comment cannot be empty!')
]

const editCommentValidator=[
    body('comment').optional().notEmpty().withMessage('Comment cannot be empty!')
]

const handleValidation=(req,res,next)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        const errorMessage=errors.array()[0].msg
        throw new customErrorHandler(400,errorMessage)
    }
    next()
}

export {userSignupValidator, userSigninValidator, newPostValidator, editPostValidator, addCommentValidator, editCommentValidator, handleValidation}