import { pool } from "../../common/config/db.js";
import type { NominatimResponse, position, post } from "./post.types.js";

export async function createPostService(data:post){
    
    const postQuery = await pool.query("INSERT INTO users(title , content , location) VALUES ($1 , $2 , $3)" , [data.title , data.content , data.location])
    console.log("Post created")
 
}

export async function getPostService(id:number){

    
    const postQuery = await pool.query("SELECT * FROM posts WHERE id = $1 ORDER BY id LIMIT 5" , [id])

    const post = postQuery.rows[0]

    return post

}

export async function myPostService(userId:number){

    const allPostQuery = await pool.query("SELECT * FROM posts WHERE user_id=$1 ORDER BY id LIMIT 6" , [userId])

    return allPostQuery.rows[0]

}

export async function locationService(pos:position){

    const {latitude , longitude} = pos

    const location = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${latitude}&format=json`)

    const res:NominatimResponse = await location.json()

    return res

}

export async function nearbyEventService(state:string , after:number){

    const events = await pool.query("SELECT * FROM posts WHERE location = $1 " , [state])

    return events.rows[0]

}

export async function getPostsService(after:number){

    if(!after){

        const events = await pool.query("SELECT * FROM posts ORDER BY id LIMIT 5")

        return events.rows[0]

    }

    const events = await pool.query("SELECT * FROM posts WHERE id>$1 ORDER BY id ASC LIMIT 5" , [after])

    return events.rows[0]


}