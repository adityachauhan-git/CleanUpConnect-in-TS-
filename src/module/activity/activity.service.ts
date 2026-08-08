import { pool } from "../../common/config/db.js"

export interface activityType{
    actor_id:number,
    type: string,
    entity_type: string,
    entity_id:number,
    metadata:object
}



export async function logActivity(activity:activityType){

    const activityQuery = await pool.query("INSERT INTO activity(actor_id , type , entity_type , entity_id , metadata) VALUES($1 , $2, $3 , $4)" , [activity.actor_id , activity.type , activity.entity_type , activity.metadata])

    return activityQuery.rows[0]
}

async function getActivityService(conditions:object , userIdData?:string){

    const user_id = Number(userIdData)

    const activityQuery = await pool.query("SELECT metadata FROM activities WHERE actor_id = $1" , [user_id])

    return activityQuery.rows[0]

}

export {getActivityService}