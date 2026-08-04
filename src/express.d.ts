import type { JwtPayload } from "./module/auth/auth.types.ts";// or wherever your type is

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export {};