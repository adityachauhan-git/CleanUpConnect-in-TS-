import { Router } from "express";
import { authMiddleware } from "../auth/auth.middleware.js";
import { getActivityService } from "./activity.service.js";
import { getActivityController } from "./activity.controller.js";

const router = Router()

router.get("/" , authMiddleware , getActivityController)