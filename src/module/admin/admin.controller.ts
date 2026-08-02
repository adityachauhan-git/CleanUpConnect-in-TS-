import type { Request, Response } from "express";
import type { postParams } from "../posts/post.types.js";
import { eventCompleteService, getCreatorService, rewardVolenteerService } from "./admin.serveice.js";
import type { userid } from "./admin.types.js";

export async function eventCompleteController(req:Request<postParams>, res:Response){

    const postId = Number(req.params.id)
    
    try{

        const id = await getCreatorService(postId)

        eventCompleteService(id)

        return res.status(200).json({
            message:"points increased"
        })
        

    }
    catch(err){
        console.log("Something went wrong eventCompleteController")
        console.log(err)
    }

}

export async function rewardVolenteerController(req:Request<userid> , res:Response){

    const id = req.params.id

    try{
        rewardVolenteerService(id)

        return 
    }
    catch(err){

        res.status(500).json({
            message:"Internal Server Error"
        })

        console.log("rewardVolenteerService Failed!")
    }

}