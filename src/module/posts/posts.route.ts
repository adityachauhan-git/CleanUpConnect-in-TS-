import { Router } from "express";
import { authMiddleware } from "../auth/auth.middleware.js";
import { createPostController, getPostController } from "./posts.controller.js";

const router = Router()

router.post("/post" , authMiddleware ,  createPostController)
router.get("/post/:id" , authMiddleware , getPostController)

export default router