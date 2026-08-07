import { pool } from "../../common/config/db.js";
import { logActivity, type activityType } from "../../common/utils/activity.js";
import type { userid } from "../points/points.types.js";
import type {
  comment,
  eventData,
  eventParams,
  NominatimResponse,
  position,
  post,
} from "./post.types.js";

async function increaseXPService(xp:number , id:number){

  const newXPQUery = await pool.query("UPDATE users WHERE id = $1 SET xp = xp+$2 RETURNING xp , level" , [id , xp])

  const { newXp, level} =  newXPQUery.rows[0]

  

  return{
    newXP:newXp,
    level:level
  }

}

async function levelService(xp:number , oldLevel:number , user_id:number){

  const newLevel =  Math.floor(xp/50)

  if(newLevel<oldLevel){
    return {
      level:oldLevel
    }
  }

  await pool.query("UPDATE users WHERE id = $1 SET level = $2" , [user_id,newLevel])

  const activity:activityType = {

    actor_id:user_id,
    type:"LEVEL_UP",
    entity_type:"LEVEL",
    entity_id:user_id,
    metadata:{
      newLevel:newLevel
    }
    
  }

  await logActivity(activity)
}

export async function createPostService(data: post) {
  const postQuery = await pool.query(
    "INSERT INTO posts(title , content , location , creator_id) VALUES ($1 , $2 , $3 , $4) RETURNING id",
    [data.title, data.content, data.location, data.creator_id]
  );

  const newXP = await increaseXPService(30 , data.creator_id)

  const level = await levelService(newXP.newXP , newXP.level, data.creator_id)

  const activity:activityType = {
  actor_id: data.creator_id,
    type: "EVENT_CREATED",
    entity_type: "EVENT",
    entity_id: postQuery.rows[0].id,
    metadata: {
      event_name:data.title
    }  }

   await logActivity(activity)

  console.log("Post created");
}

export async function getPostService(id: number) {
  console.log(id);
  const postQuery = await pool.query(
    "SELECT * FROM posts WHERE id = $1 ORDER BY id LIMIT 5",
    [id],
  );

  const post = postQuery.rows[0];

  return post;
}

export async function myPostService(userId: number) {
  const allPostQuery = await pool.query(
    "SELECT * FROM posts WHERE creator_id=$1 ORDER BY id LIMIT 6",
    [userId],
  );

  return allPostQuery.rows[0];
}

export async function locationService(pos: position) {
  const { latitude, longitude } = pos;

  const location = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${latitude}&format=json`,
  );

  const res: NominatimResponse = await location.json();

  return res;
}

export async function nearbyEventService(state: string, after: number) {
  const events = await pool.query("SELECT * FROM posts WHERE location = $1 ", [
    state,
  ]);

  return events.rows[0];
}

export async function getRecentPostsService(after: number) {
  if (!after) {
    const events = await pool.query(
      "SELECT * FROM posts ORDER BY id DESC LIMIT 5",
    );
    console.log(events);
    return events.rows[0];
  }

  const events = await pool.query(
    "SELECT * FROM posts WHERE id>$1 ORDER BY id DSC LIMIT 5",
    [after],
  );

  return events.rows[0];
}

export async function joinService(data: eventData) {
  const { user_id, event_id } = data;

  console.log(data);

  await pool.query(
    "INSERT INTO volenteers(volenteer_id , event_id)  VALUES($1 , $2)",
    [user_id, event_id],
  );

  const newXP = await increaseXPService(20 , user_id)

  const levelUpdate = await levelService(newXP.newXP , newXP.level, user_id)

}

export async function getMemberService(data: number) {
  const result = await pool.query(
    "SELECT * FROM volenteers WHERE event_id = $1",
    [data],
  );

  return result.rows[0];
}

export async function updatePostService(data:JoinData){

  pool.query("UPDATE posts SET content = $1" , [data])

}

export async function addCommentService(commentBody:comment  , eventIdParams:string  , userIdParams?:string){

  const event_id = Number(eventIdParams)
  const user_id = Number(userIdParams)
  const comment = commentBody

  const commentQuery =await pool.query("INSERT INTO comments(event_id , user_id , comment)  VALUES($1 , $2 , $3) RETURNING comment" , [event_id , user_id , comment])

  const newXP = await increaseXPService(10 , user_id)
  const level = await levelService(newXP.newXP , newXP.level , user_id)

  const result = {

    message:"comment created",

    comment:commentQuery.rows[0]

  }

  return result
}