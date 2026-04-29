import { Request, Response } from "express";
import { UserRepository } from "../repositories/user.repository.js";
import { ConsultUserDTO, UserCreateDTO } from "../entities/IUser.js";

export class UserController {
  private _userRepository: UserRepository = new UserRepository();
  constructor() { }

  registerNewUser = async (req: Request, res: Response) => {
    const newUserData: UserCreateDTO = req.body as UserCreateDTO;
    console.log(newUserData)
    try {
      const newUserRegistred = await this._userRepository.registerUser(newUserData);

      if (newUserRegistred === null) {
        throw new Error("Erro ao registrar novo usuário");
        // return res.json({ Error: "Novo usuario não registrado" }).status(500);
      }
      return res.json(newUserRegistred).status(201);
    } catch (err) {
      //corrigir depois, nãoexibir o erro do banco diretamente
      return res.json(err).status(500);
    }
  };

  getUser = async (req: Request, res: Response) => {
    const userIdReq = Number(req.params.id);
    //console.log("ID do usuário solicitado:", idUser, (req as any).userId);

    if ((req as any).userId !== userIdReq) {
      return res.json({ message: "Acesso negado" }).status(403);
    }

    try {
      const user: UserCreateDTO | null = await this._userRepository.getUserById(userIdReq);

      if (!user) {
        return res.json({ messager: "Usuário não encontrado" }).status(300);
      }
      return res.json(user).status(200);
    } catch (err) {
      console.log(err);
    }

  };

  verifyUserExist = async (req: Request, res: Response) => {
    const consult: ConsultUserDTO | undefined = req.body;
    console.log("Consult DTO recebido:", consult);

    if (consult) {
      const userExist = await this._userRepository.consultUser(consult);

      if (userExist === true) {
        return res.json({ exist: userExist }).status(200);
      }
      return res.json({ exist: userExist }).status(401);
    }
  }
}
