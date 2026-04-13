import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

/** Payload esperado no token JWT. */
interface TokenPayload {
  userId: number;
  email: string;
  password: string;
  iat: number;
  exp: number;
}

export function security(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token nao informado." });
  }

  const parts = authHeader.split(" ");

  const [type, token] = parts;

  const secret = process.env.JWT_SECRET as string;

  try {
    //autenticação
    const decoded = jwt.verify(token, secret) as TokenPayload;


    //pegando id do cliente
    (req as any).userId = decoded.userId;
    console.log("Token verificado com sucesso. ID do user:", decoded, decoded.userId);

    return next();
  } catch (error) {
    return res.status(401).json({ message: "Token invalido ou expirado." });
  }
}
