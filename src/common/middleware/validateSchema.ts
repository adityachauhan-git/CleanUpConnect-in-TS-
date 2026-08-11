import type { Request, Response, NextFunction } from "express";
import { z, ZodType } from "zod";

type RequestSchema = {
    body?: ZodType;
    query?: ZodType;
    params?: ZodType;
};

export const validate = (schema: RequestSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const errors: Record<string, unknown> = {};

        if (schema.body) {
            const result = schema.body.safeParse(req.body);

            if (!result.success) {
                errors.body = result.error.issues;
            } else {
                req.body = result.data;
            }
        }

        if (schema.query) {
            const result = schema.query.safeParse(req.query);

            if (!result.success) {
                errors.query = result.error.issues;
            } else {
                req.query = result.data as typeof req.query;
            }
        }

        if (schema.params) {
            const result = schema.params.safeParse(req.params);

            if (!result.success) {
                errors.params = result.error.issues;
            } else {
                req.params = result.data as typeof req.params;
            }
        }

        if (Object.keys(errors).length > 0) {
            return res.status(400).json({
                message: "Validation failed",
                errors
            });
        }

        next();
    };
};