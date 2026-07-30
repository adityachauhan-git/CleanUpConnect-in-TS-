import type { NextFunction, Request, Response } from "express";
import type { Tokens } from "./auth.types.js";
import jwt from "jsonwebtoken"


export async function authMiddleware(req:Request, res:Response, next:NextFunction){

    const tokens = {
        ACCESS_TOKEN : req.cookies.accessToken , 
        REFRESH_TOKEN : req.cookies.refreshToken
    }

    const accessToken = jwt.verify(tokens.ACCESS_TOKEN , process.env.ACCESS_TOKEN_KEY!)
    
    req.user = accessToken

    if(!accessToken){
        return {}
    }

    

    next()
}