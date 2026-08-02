import { pool } from "../../common/config/db.js"

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

export async function rewardVolenteerService(id:Number){

    pool.query("UPDATE users SET  points = points + 5 WHERE id = $1" , [id])

}