import { request, response, type Request, type Response } from "express";
import type { eventParams, position, post, postParams } from "./post.types.js";
import { createPostService, getMemberService, getPostService, getRecentPostsService, joinService, locationService, myPostService, nearbyEventService } from "./posts.service.js";
import type { RequestHandler } from "express-serve-static-core";
import { after } from "node:test";
import type { AuthRequest } from "../../types/authRequest.js";




export async function createPostController(req:Request<{} , {} , post>, res:Response){

    const data = {
        title: req.body.title,
        content:req.body.content,
        location:req.body.location,
        creator_id:Number(req.user?.id)
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

export const   getPostController: RequestHandler<string> = async (req , res) =>{
    
    
    const postId = Number(req.params)

    const after = Number(req.query.after)

    try{
    
    
    const post = await getPostService(postId )

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

export async function myPostController(req:AuthRequest , res:Response){

    const id = Number(req.user?.id)

    try{

        const posts = await myPostService(id)

        return res.status(200).json({
            message:"Posts found",
            data:posts
        })

    }
    catch(err){
        
        console.log("myPostService Failed!")

        return res.status(500).json({
            message:"Internal server error"
        })

    }

}

export async function getRecentPostsController(req:Request , res:Response){

    const afterQuery = req.query.after
    

    const after = Number(afterQuery)
    try{
        const events = await getRecentPostsService(after)

        return res.status(200).json({
            message: "Events retrieved successfully",
            data: events
        })
    }
    catch(err){

        return res.status(500)

        console.log("Error in getPostsService")
    }

}

export async function nearbyEventsController(req:Request<{} , {} , position> , res:Response){


    const afterQuery = req.query.after
    const after = Number(afterQuery)

    const location = await locationService(req.body)


    //TODO: get the location and the post near the location
    const state = location.address.state

    const events = await nearbyEventService(state , after)

    return res.status(200).json({
        message:"Events found",
        data:events
    })

}

export async function joinEventController(req:AuthRequest<eventParams> , res:Response){

    const user_id = Number(req.user?.id)
    const event_id = Number(req.params.id)

    const data = {
        user_id:user_id,
        event_id:event_id
    }

    try{

        await joinService(data)

        res.status(200).json({
            message: "Joined successfully"
        })

    }
    catch(err){
        res.status(500).json({
            message:"Internal server error"
        })
    }


}

export async function getMemberController(req:Request<postParams> , res:Response){

    const event_id = Number(req.params.id)

    try{
        const events = await getMemberService(event_id)

        return res.status(200).json({
            message:"members found",
            data:events
        })

        console.log("getMemberService Successfull!")

    }
    catch(err){

        console.log("getMemberService Failed!")
        return res.status(500).json({
            message:"Internal Server Error!"
        })
    }

}



