import type { Request, Response } from "express";
import type { eventParams, postParams } from "../posts/post.types.js";
import {
  eventCompleteService,
  getCreatorService,
  rewardVolenteerService,
} from "./role.serveice.js";
import type { userid } from "./role.types.js";
import type { AuthRequest } from "../../types/authRequest.js";

export async function eventCompleteController(
  req: Request<postParams>,
  res: Response,
) {
  const postId = Number(req.params.id);

  try {
    const id = await getCreatorService(postId);

    await eventCompleteService(id);

    return res.status(200).json({
      message: "points increased",
    });
  } catch (err) {
    console.log("Something went wrong eventCompleteController");
    console.log(err);
  }
}

export async function rewardVolenteerController(
  req: AuthRequest<userid, {}, {}, eventParams>,
  res: Response,
) {
  const id = Number(req.params.userid);
  const creator = Number(req.user?.id);
  const event = Number(req.query.eventid);

  try {
    const data = {
      creator_id: creator,
      volenteer_id: id,
      event_id: event,
    };

    await rewardVolenteerService(data);

    return res.status(200).json({
      message: "Points aloted",
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
    });

    console.log("rewardVolenteerService Failed!");
  }
}
