import { pool } from "../config/db.js"

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