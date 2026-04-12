import { Request, Response } from "express";
import { UserRepository } from "../repositories/user.repository.js";
import { UserDTO } from "../entities/IUser.js";

export class UserController {
  private _userRepository: UserRepository = new UserRepository();
  constructor() {}

  registerNewUser = async (req: Request, res: Response) => {
    const newUserData: UserDTO = req.body as UserDTO;
    try {
      const newUserRegistred =
        await this._userRepository.registerUser(newUserData);

      if (newUserRegistred === null) {
        return res.json({ Error: "Novo usuario não registrado" }).status(500);
      }
      return res.json(newUserRegistred).status(201);
    } catch (err) {
      console.log(err);
    }
  };

  getUser = async (req: Request, res: Response) => {
    const idUser = Number(req.params.id);
    try {
      const user: UserDTO | null = await this._userRepository.getUserById(idUser);

      if (!user) {
       return res.json({ messager: "Usuário não encontrado" }).status(300);
      }
      return res.json(user).status(200);

    } catch (err) {
      console.log(err);
    }
  };
}
