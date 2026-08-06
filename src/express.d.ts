import type { JwtPayload } from "./module/auth/auth.types.ts";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export {};
