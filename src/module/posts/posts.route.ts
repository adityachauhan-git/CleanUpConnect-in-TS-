import { Router } from "express";
import { authMiddleware } from "../auth/auth.middleware.js";
import {
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
router.get("/recent", authMiddleware, getRecentPostsController);
router.get("/me", authMiddleware, myPostController);
router.get("/members/:id", authMiddleware, getMemberController);
//TODO: check the external api
router.get("/nearby", authMiddleware, nearbyEventsController);
router.get("/:id", authMiddleware, getPostController);
router.patch("/:id" , authMiddleware , )
router.post("/join/:eventid", authMiddleware, joinEventController);

export default router;
