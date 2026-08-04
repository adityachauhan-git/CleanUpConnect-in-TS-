import { pool } from "../../common/config/db.js"
import type { rewardData } from "./role.types.js"

export async function getCreatorService(id:Number){

    try{
        const creator = await pool.query("SELECT creator_id FROM posts WHERE id = $1 " , [id])

        return creator.rows[0]
    }
    catch(err){
        console.log("getCreatorService Failed!")
        console.log(err)
    }

}

export async function eventCompleteService(creator_id:Number){

    try{

        pool.query("UPDATE users SET points = points+10 WHERE id = $1" , [creator_id])

    }
    catch(err){
        console.log("eventCompleteService Failed!")
        console.log(err)
    }
}

export async function rewardVolenteerService(data:rewardData){

    const event_id = data.event_id
    const creator_id = data.creator_id
    const volenteer_id = data.volenteer_id

    const result = await pool.query("SELECT 1 FROM events WHERE creator_id = $1 AND id = $2" , [creator_id , event_id])

    if(result.rows.length===0){
        return 0
    }

    
    await pool.query("UPDATE users SET  points = points + 5 WHERE id = $1" , [volenteer_id])
    

}