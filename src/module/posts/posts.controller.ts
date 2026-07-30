import type { Request, Response } from "express";
import type { post, postParams } from "./post.types.js";
import { createPostService, getPostService } from "./posts.service.js";



export async function createPostController(req:Request<{} , {} , post>, res:Response){

    const data = {
        title: req.body.title,
        content:req.body.content
    }

    try{
        await createPostService(data)
        console.log("createPostService Successfull")
        return res.status(201).json({
            message:"Post created",
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

export async function getPostController(req: Request<postParams>, res:Response){

    const { id } = req.params as postParams
    const postId = Number(id)

    if(Number.isNaN(postId)){
        return res.status(400).json({
            message: "Invalid post id"
        })
    }

    try{
        const post = await getPostService(postId)

        if(!post){
            return res.status(404).json({
                message: "Post not found"
            })
        }

        return res.status(200).json({
            post
        })
    }
    catch(err){
        console.log("getPostService Failed!")
        console.log(err)

        return res.status(500).json({
            message: "Failed to get post"
        })
    }

}