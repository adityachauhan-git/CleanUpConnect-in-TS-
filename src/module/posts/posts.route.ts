import { Router } from "express";
import { authMiddleware } from "../auth/auth.middleware.js";
import { createPostController, getMemberController, getPostController, getRecentPostsController, joinEventController, myPostController, nearbyEventsController } from "./posts.controller.js";



const router = Router()

router.post("/post" , authMiddleware , createPostController )
router.get("/post/:id" ,authMiddleware, getPostController)
router.get("/posts" ,authMiddleware, getRecentPostsController)
router.get("/myposts" , authMiddleware , myPostController)
router.post("/join/:eventid" , authMiddleware , joinEventController )
//TODO: check the external api 
router.get("/nearby" ,authMiddleware, nearbyEventsController)
router.get("/members/:eventid" ,authMiddleware , getMemberController)


export default router