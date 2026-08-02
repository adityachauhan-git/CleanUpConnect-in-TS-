import { Router } from "express";
import { eventCompleteController } from "./admin.controller.js";

const router = Router()

router.post("/eventcomplete/:eventid" ,  eventCompleteController)
router.post("/rewardvolenteer/:userid" ,  )