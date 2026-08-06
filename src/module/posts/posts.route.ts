import { Router } from "express";
import { authMiddleware } from "../auth/auth.middleware.js";
import {
  AddCommentController,
  createPostController,
  getMemberController,
  getPostController,
  getRecentPostsController,
  joinEventController,
  myPostController,
  nearbyEventsController,
} from "./posts.controller.js";

const router = Router();

router.post("/", authMiddleware, createPostController);
router.post("/join/:eventid", authMiddleware, joinEventController);
router.post("comment/:eventid" , authMiddleware , AddCommentController);
router.get("/recent", authMiddleware, getRecentPostsController);
router.get("/me", authMiddleware, myPostController);
router.get("/members/:id", authMiddleware, getMemberController);
//TODO: check the external api
router.get("/nearby", authMiddleware, nearbyEventsController);
router.get("/:id", authMiddleware, getPostController);
router.patch("/:id" , authMiddleware , )

export default router;
