import { Router } from "express";
import {
  eventCompleteController,
  leaderboardController,
  rewardVolenteerController,
} from "./points.controller.js";
import { authMiddleware } from "../auth/auth.middleware.js";

const router = Router();

router.get("/leaderboard" , leaderboardController)
router.post("/:eventid",authMiddleware, eventCompleteController);
router.post("/:userid", authMiddleware, rewardVolenteerController);

export default router;
