//Middleware to verify whether the user is Admin or not
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

const verifyadmin=asyncHandler(async(req,_,next)=>{
    try {
        const token=req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
    
        if (!token) {
            throw new ApiError(401,"Unauthorized request")
        }
    
        const decodedToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
    
        if(decodedToken?.role!="Admin"){
            throw new ApiError(401,"Unauthorized request")
        }
    
        req.user=user;
        next()
    } catch (error) {
        throw new ApiError(401,error?.message || "Invalid access token")
    }
})

export {verifyadmin}