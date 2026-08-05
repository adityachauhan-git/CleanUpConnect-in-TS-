import { Router } from "express";
import { authMiddleware } from "../auth/auth.middleware.js";
import { createPostController, getMemberController, getPostController, getRecentPostsController, joinEventController, myPostController, nearbyEventsController } from "./posts.controller.js";



const router = Router()

router.post("/" , authMiddleware , createPostController )
router.get("/:id" ,authMiddleware, getPostController)
router.get("/recent" ,authMiddleware, getRecentPostsController)
router.get("/me" , authMiddleware , myPostController)
router.post("/join/:eventid" , authMiddleware , joinEventController )
//TODO: check the external api 
router.get("/nearby" ,authMiddleware, nearbyEventsController)
router.get("/members/:eventid" ,authMiddleware , getMemberController)


export default router