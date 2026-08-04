import type { NextFunction, Request, Response } from "express";
import type { JwtPayload, Tokens } from "./auth.types.js";
import jwt from "jsonwebtoken"
import type { AuthRequest } from "../../types/authRequest.js";


export async function authMiddleware(req:AuthRequest, res:Response, next:NextFunction){

    const authHeader = req.headers.authorization  

    try{

        if (!authHeader) {
        return res.sendStatus(401);
        }

        const token =  authHeader.split(" ")[1]

        if(!token){
            return res.sendStatus(401)
        }

        const user = jwt.verify(token , process.env.ACCESS_TOKEN_KEY!) as JwtPayload
    
        req.user = user
    }
    catch(err){
        console.log(err)
        return res.sendStatus(401)
    }

    next()
}
