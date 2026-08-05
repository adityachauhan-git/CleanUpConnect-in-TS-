import type { NextFunction, Request, Response } from "express";
import type { JwtPayload, Tokens } from "./auth.types.js";
import jwt from "jsonwebtoken"
import type { AuthRequest } from "../../types/authRequest.js";


export async function authMiddleware(req:AuthRequest, res:Response, next:NextFunction){

    const authHeader = req.headers.authorization  

    console.log(authHeader)

    try{

        if (!authHeader) {
        return res.sendStatus(401);
        }

        const token =  authHeader.split(" ")[1]

        console.log(token)

        if(!token){
            return res.sendStatus(401)
        }
        console.log(process.env.ACCESS_TOKEN_KEY)
        const user = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET!) as JwtPayload

        console.log(user)
    
        req.user = user
    }
    catch(err){
        console.log(err)
        return res.sendStatus(401)
    }

    next()
}
