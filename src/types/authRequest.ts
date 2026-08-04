import type { Request } from "express";

export interface AuthRequest<
  P = {},
  ResBody = any,
  ReqBody = any,
  ReqQuery = {}
> extends Request<P, ResBody, ReqBody, ReqQuery> {
  user?: {
    id: string;
    username:string
    
  };
}

