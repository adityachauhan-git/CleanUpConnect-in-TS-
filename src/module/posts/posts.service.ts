import { pool } from "../../common/config/db.js";
import type { post } from "./post.types.js";

export async function createPostService(data:post){
    
    const postQuery = await pool.query("INSERT INTO users(title , content) VALUES ($1 , $2)" , [data.title , data.content])
    console.log("Post created")
 
}

export async function getPostService(id:number){

    try{
        const postQuery = await pool.query("SELECT * FROM posts WHERE ")
    }
    catch(err){
        
    }

}