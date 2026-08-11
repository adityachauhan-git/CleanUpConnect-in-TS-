import { Router } from "express";
import { getAllNotificationController } from "./notification.controller.js";
import { authMiddleware } from "../auth/auth.middleware.js";

const router = Router()

router.get("/" , authMiddleware, getAllNotificationController)