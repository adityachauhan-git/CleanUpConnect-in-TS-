import { Router } from "express";
import {
  eventCompleteController,
  rewardVolenteerController,
} from "./role.controller.js";
import { authMiddleware } from "../auth/auth.middleware.js";

const router = Router();

router.post("/eventcomplete/:eventid", eventCompleteController);
router.post("/volenteer/:userid", authMiddleware, rewardVolenteerController);

export default router;
