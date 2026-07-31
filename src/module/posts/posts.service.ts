import { pool } from "../../common/config/db.js";
import type { position, post } from "./post.types.js";

export async function createPostService(data:post){
    
    const postQuery = await pool.query("INSERT INTO users(title , content) VALUES ($1 , $2)" , [data.title , data.content])
    console.log("Post created")
 
}

export async function getPostService(id:number){

        const postQuery = await pool.query("SELECT * FROM posts WHERE id = $1" , [id])

        const post = postQuery.rows[0]

        return post

}

export async function myPostService(userId:number){

    const allPostQuery = await pool.query("SELECT * FROM posts WHERE user_id=$1" , [userId])

    return allPostQuery.rows[0]

}

export async function locationService(pos:position){

    const {latitude , longitude} = pos

    const location = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${latitude}&format=json`)

    const res = await location.json()

    return res

}