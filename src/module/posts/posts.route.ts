import { Router } from "express";
import { authMiddleware } from "../auth/auth.middleware.js";
import { createPostController, getMemberController, getPostController, getRecentPostsController, myPostController, nearbyEventsController } from "./posts.controller.js";



const router = Router()

router.post("/post" , authMiddleware , createPostController )
router.get("/post/:id" ,authMiddleware, getPostController)
router.get("/posts" ,authMiddleware, getRecentPostsController)
router.get("/myposts" , authMiddleware , myPostController)
router.post("/join/:eventid" , authMiddleware , )
router.get("/nearby" ,authMiddleware, nearbyEventsController)
router.get("/members/:eventid" ,authMiddleware , getMemberController)


export default router