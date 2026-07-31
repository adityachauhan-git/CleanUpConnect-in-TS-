import type { NextFunction, Request, Response } from "express";
import type { Tokens } from "./auth.types.js";
import jwt from "jsonwebtoken"


export async function authMiddleware(req:Request, res:Response, next:NextFunction){

    const tokens = {
        ACCESS_TOKEN : req.cookies.accessToken , 
        
    }

    const user = jwt.verify(tokens.ACCESS_TOKEN , process.env.ACCESS_TOKEN_KEY!)


    
    req.user = user

    if(!user){
        return {}
    }

    

    next()
}