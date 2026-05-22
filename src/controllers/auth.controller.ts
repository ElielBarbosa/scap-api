// src/controllers/authController.ts
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserRepository } from "../repositories/user.repository.js";
import { UserAutenticateDTO, UserCreateDTO, UserDTO, UserLoginDTO, UserTokenSigntureDTO } from "../entities/IUser.js";

export class AuthController {
  private _userRepository: UserRepository = new UserRepository();

  constructor() { }

  private bearerToken(login: Partial<UserTokenSigntureDTO>): string {
    const secret = process.env.JWT_SECRET as string;

    if (!secret) {
      throw new Error("JWT_SECRET não definido no ambiente.");
    }

    const token = jwt.sign(login, secret, { expiresIn: "1h" });
    return token;
  }

  login = async (req: Request, res: Response) => {
    const UserLogin = req.body as UserLoginDTO;
    console.log(UserLogin)

    const user: UserAutenticateDTO | null = await this._userRepository.login(UserLogin);
    console.log(user)

    if (!user) {
      return res.status(401).json({ message: "Combinação de login e senha inválida." });
    }

    const userToken: UserTokenSigntureDTO = {
      userId: user.userId,
      userType: user.userType,
      email: user.email,
      campusId: user.campusId
    }
    const token = this.bearerToken(userToken);
    return res.status(200).json({ user, token: `Bearer ${token}` });
  };

  registerNewUser = async (req: Request, res: Response) => {
    const newUserData: UserCreateDTO = req.body as UserCreateDTO;
    console.log(newUserData)
    try {
      const user = await this._userRepository.registerUser(newUserData);

      if (user === null) {
        throw new Error("Erro ao registrar novo usuário");
        // return res.json({ Error: "Novo usuario não registrado" }).status(500);
      }

      // const userToken: UserTokenSigntureDTO = {
      //   userId: user.id,
      //   userType: user.user_type,
      //   email: user.email,
      //   campusId: user.campus_id
      // }

      const token = this.bearerToken(user);
      return res.json({ user, token }).status(201);
    } catch (err) {
      //corrigir depois, nãoexibir o erro do banco diretamente
      return res.json(err).status(500);
    }
  };

  validateToken = (req: Request, res: Response) => {
    const secret = process.env.JWT_SECRET as string

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(200).json({ valido: false });
    }

    const parts = authHeader.split(' ');

    if (parts.length !== 2) {
      return res.status(200).json({ valido: false });
    }

    const [scheme, token] = parts;
    console.log(!/^Bearer$/i.test(scheme))

    if (!/^Bearer$/i.test(scheme)) {
      return res.status(200).json({ valido: false });
    }


    try {
      console.log(jwt.verify(token, secret));
      jwt.verify(token, secret);


      return res.status(200).json({ valido: true });
    } catch (err) {

      return res.status(200).json({ valido: false });
    }
  };


}
