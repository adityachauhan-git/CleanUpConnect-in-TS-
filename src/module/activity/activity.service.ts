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

async function getActivityService(conditionsData:object , userIdData?:string){

    const user_id = Number(userIdData)

    let conditions: string[] = []

   
    let values = []

    for(const [key , value] of Object.entries(conditionsData)){
        conditions.push(`${key} = $${value.length + 1}`)

        values.push(value)
    }

    const conditionsQuery = 
        conditions.length>0
        ? `WHERE ${conditions.join(" AND ")}`
        :""

    const query = "SELECT metadata FROM activities "+conditionsQuery

    const activityQuery = await pool.query(query , values)

    return activityQuery.rows[0]

}

export {getActivityService}