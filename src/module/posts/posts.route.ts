import { Router } from "express";
import { authMiddleware } from "../auth/auth.middleware.js";
import { createPostController, getPostController, myPostController, nearbyEventsController } from "./posts.controller.js";


const router = Router()

router.post("/post" , authMiddleware , createPostController )
router.get("/post/:id" , getPostController)
router.get("/posts" , )
router.get("/myposts" , authMiddleware , myPostController)
router.get("/nearby" ,authMiddleware, nearbyEventsController)


export default router