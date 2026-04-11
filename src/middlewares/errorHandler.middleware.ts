import { ZodError } from "zod";
import { Request, Response, NextFunction } from "express";

export function errorHandle(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (err instanceof ZodError) {
    return res.status(400).json({
      message: "Dados inválidos",
      issues: err.issues.map((i) => ({
        path: i.path.join("."),
        message: i.message,
      })),
    });
  }

  console.error(err);
  return res.status(500).json({ message: "Erro interno" });
}
