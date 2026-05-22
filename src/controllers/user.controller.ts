import { Request, Response } from "express";
import { UserRepository } from "../repositories/user.repository.js";
import { ConsultUserDTO, UserAutenticateDTO, UserAutoLoginDTO, UserCreateDTO, UserTokenSigntureDTO } from "../entities/IUser.js";
import jwt from "jsonwebtoken"

export class UserController {
  private _userRepository: UserRepository = new UserRepository();
  constructor() { }



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

  getUserByToken = async (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;
    const secret = process.env.JWT_SECRET as string;

    if (!authHeader) {
      return res.status(401).json({ error: 'Token não fornecido.' });
    }

    // Limpa o Bearer (aceita com ou sem espaço, igual ao anterior)
    const token = authHeader.replace(/^Bearer\s+/i, '').trim();

    try {
      //jwt.verify valida o token e já devolve o payload decodificado
      const decoded = jwt.verify(token, secret) as any;

      // Retorna os dados do usuário encontrados dentro do token
      const user: any = await this._userRepository.getUserById(decoded.userId)

      if (!user) {
        res.status(404).json({ messager: "usuário não encontrado" })
      }

      const userToken: UserAutoLoginDTO = {
        username: user.user_name,
        id: user.id,
        userType: user.user_type,
        email: user.email,
        campusId: user.campus_id,
        registration: user.registration
      }

      return res.status(200).json({
        success: true,
        usuario: userToken
      });

    } catch (err) {
      // Se o token estiver expirado ou for inválido
      return res.status(401).json({ error: 'Token inválido ou expirado.' });
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
