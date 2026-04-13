// src/controllers/authController.ts
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserRepository } from "../repositories/user.repository.js";
import { UserDTO, UserLoginDTO } from "../entities/IUser.js";

export class AuthController {
  private _userRepository: UserRepository = new UserRepository();

  constructor() { }

  private bearerToken(login: UserLoginDTO): string {
    const secret = process.env.JWT_SECRET as string;

    if (!secret) {
      throw new Error("JWT_SECRET não definido no ambiente.");
    }

    const token = jwt.sign(login, secret, { expiresIn: "1h" });
    return token;
  }

  login = async (req: Request, res: Response) => {
    const UserLogin = req.body as UserLoginDTO;

    const user: UserLoginDTO | null = await this._userRepository.login(UserLogin);

    if (!user) {
      return res.status(401).json({ message: "Login ou senha invalidos." });
    }

    const token = this.bearerToken(user);
    return res.status(200).json({ token: `Bearer ${token}` });
  };
}
