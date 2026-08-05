import type { Request, Response } from "express";
import type { LoginBody, RegisterBody } from "./auth.types.js";
import { loginService, registerService } from "./auth.services.js";
import type { AuthRequest } from "../../types/authRequest.js";


async function registerController(req:AuthRequest<{} , {} , RegisterBody> , res:Response){

    const data = req.body
    console.log(data)
    try{
        const result = await registerService(data)
        res.status(200).json({
            message:"User created!"
        })
    }
    catch(err){
        console.log(err)
    }
}

export async function loginController(req:Request<{} , {} , LoginBody> , res:Response){
    try{
        const data = req.body
        const tokens = await loginService(data)

        if(tokens.ACCESS_TOKEN===""||tokens.REFRESH_TOKEN===""){
            res.status(403).json({
                message:"No Token found!"
            })
        }

        res.cookie("accessToken" , tokens.ACCESS_TOKEN , {
            maxAge: 900000,
            httpOnly: true
        })

        res.cookie("refreshToken" , tokens.REFRESH_TOKEN , {
            maxAge: 7 * 24 * 60 * 60 * 60,
            httpOnly:true
        })

        res.status(200).json({
            message:"Login successfull"
        })
        
    }
    catch(err){
        console.log(err)
        
        
    }
}


export {registerController}