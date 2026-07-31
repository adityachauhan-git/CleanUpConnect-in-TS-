import { request, response, type Request, type Response } from "express";
import type { position, post, postParams } from "./post.types.js";
import { createPostService, getPostService, locationService, myPostService } from "./posts.service.js";
import type { RequestHandler } from "express-serve-static-core";




export async function createPostController(req:Request<{} , {} , post>, res:Response){

    const data = {
        title: req.body.title,
        content:req.body.content
    }

    try{
        await createPostService(data)
        console.log("createPostService Successfull")
        return res.status(201).json({
            message:"Post created"
        })
    }
    catch(err){
        
        console.log("createPostService Failed!")
        console.log(err)

        return res.status(400).json({
            message:"Post not created"
        })
    }

}

export const   getPostController: RequestHandler<postParams> = async (req , res) =>{
    
    const id = req.params.id
    const postId = Number(id)

    try{
    const post = getPostService(postId)

    res.status(200).json({
        message:"Post Found!",
        data:post
    })
    console.log("getPostService Success!")
    }
    catch(err){

        res.status(500).json({
            message:"Internal Server Error"
        })

        console.log("getPostService Failed!")
        console.log(err)
    }
}

export async function myPostController(req:Request , res:Response){

    const id = req.user.id

    try{

        const posts = myPostService(id)

        return res.status(200).json({
            message:"Posts found",
            data:posts
        })

    }
    catch(err){
        
        return res.status(500).json({
            message:"Internal server error"
        })

    }

}

export async function nearbyEventsController(req:Request<{} , {} , position> , res:Response){

    

    const location = locationService(req.body)


    //TODO: get the location and the post near the location
    const state = location

}

