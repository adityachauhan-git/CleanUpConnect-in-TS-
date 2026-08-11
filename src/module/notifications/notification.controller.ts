import type { Request, Response } from "express";
import { getAllNotificationService } from "./notification.service.js";

export async function getAllNotificationController(req:Request , res:Response){

    const notifications = getAllNotificationService(req.user?.id , req.query)

}