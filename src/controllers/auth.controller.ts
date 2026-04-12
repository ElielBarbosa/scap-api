// src/controllers/authController.ts
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserRepository } from "../repositories/user.repository.js";
import { UserDTO } from "../entities/IUser.js";

export class AuthController {
  private _userRepository: UserRepository = new UserRepository();

  constructor() { }

  login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user: UserDTO | null = await this._userRepository.auth(email, password);

    if (!user) {
      return res.status(401).json({ message: "Login ou senha invalidos." });
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("JWT_SECRET environment variable is not defined");
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      secret,
      {
        expiresIn: "1h",
      },
    );
    return res.json({
      token,
    });

  };
}
