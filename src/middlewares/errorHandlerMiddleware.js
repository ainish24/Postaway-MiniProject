export class customErrorHandler extends Error{
    constructor(statusCode, errMessage){
        super(errMessage)
        this.statusCode = statusCode
    }
}

export const errorHandlerMiddleware = (err, req, res, next)=>{
    if(err instanceof customErrorHandler){
        res.status(err.statusCode).json({
            success:false,
            message:err.message
        })
    } else{
        res.status(500).json({
            success:false,
            message:"Oops! Somethimg went wrong...Try again later"
        })
    }
}