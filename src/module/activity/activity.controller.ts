import type { Request, Response } from "express";
import { getActivityService } from "./activity.service.js";

async function getActivityController(req:Request, res:Response){
    
    const result = getActivityService(req.query , req.user?.id)

    return result
}

export {getActivityController}