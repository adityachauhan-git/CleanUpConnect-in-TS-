import { pool } from "../../common/config/db.js";
import type { joinData, NominatimResponse, position, post } from "./post.types.js";

export async function createPostService(data:post){
    
    const postQuery = await pool.query("INSERT INTO posts(title , content , location , creator_id) VALUES ($1 , $2 , $3 , $4)" , [data.title , data.content , data.location , data.creator_id])
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

export async function getRecentPostsService(after:number){

    if(!after){

        const events = await pool.query("SELECT * FROM posts ORDER BY DSC id LIMIT 5")

        return events.rows[0]

    }

    const events = await pool.query("SELECT * FROM posts WHERE id>$1 ORDER BY id DSC LIMIT 5" , [after])

    return events.rows[0]


}

export async function joinService(data:joinData){

    const {user_id , event_id} = data

    await pool.query("INSERT INTO volenteers(volenteer_id , event_id)  VALUES($1 , $2)" , [user_id , event_id])

}

export async function getMemberService(data:number){

    const result = await pool.query("SELECT * FROM volenteers WHERE event_id = $1" , [data])

    return result.rows[0]

}