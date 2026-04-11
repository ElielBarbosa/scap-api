import { ZodObject, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";
type Location = "body" | "params" | "query";

function validate(schema: ZodObject, location: Location) {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      const parsed = schema.parse(req[location]);
      (req as any)[location] = parsed;
      return next();
    } catch (err) {
      return next(err);
    }
  };
}

export const validateBody = (schema: ZodObject) => validate(schema, "body");
export const validateParams = (schema: ZodObject) => validate(schema, "params");
export const validateQuery = (schema: ZodObject) => validate(schema, "query");
