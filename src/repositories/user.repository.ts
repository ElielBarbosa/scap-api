import { PrismaClient, tb_user } from "@prisma/client";
import { prisma } from "../prisma";
import { ConsultUserDTO, UserAutenticateDTO, UserCreateDTO, UserDTO, UserLoginDTO } from "../entities/IUser";


export class UserRepository {
  private _db: PrismaClient = prisma;
  constructor() { }

  async registerUser(dataUser: UserCreateDTO): Promise<UserAutenticateDTO | null> {
    const newUser = (await this._db.$queryRaw`
    INSERT INTO tb_user (
      user_name,
      email,
      password_hash,
      campus_id,
      registration
    ) values (
     ${dataUser.username},
     ${dataUser.email},
     ${dataUser.password},
     ${dataUser.campusId},
     ${dataUser.registration}
    ) RETURNING *;
    `) as tb_user[];

    if (newUser.length === 0) {
      return null;
    }

    const user: UserAutenticateDTO = {
      username: newUser[0].user_name,
      userId: newUser[0].id,
      userType: newUser[0].user_type,
      campusId: newUser[0].campus_id,
      email: newUser[0].email
    }
    return user;
  }

  async getUserById(id: number): Promise<UserCreateDTO | null> {
    const newUser = (await this._db.$queryRaw`
    SELECT 
      id,
      user_name, 
      user_type, 
      email, 
      campus_id,
      registration
    FROM 
      tb_user 
    WHERE
      id = ${id};
    `) as UserCreateDTO[];

    if (newUser.length === 0) {
      return null;
    }
    return newUser[0];
  }

  async auth(userLogin: UserLoginDTO): Promise<UserDTO | null> {
    const user = (await this._db.$queryRaw`
    SELECT
      id,
      user_name,
      user_type,
      email,
      password_hash,
      campus_id,
      registration
    FROM
      tb_user
    WHERE
      email = ${userLogin.email} AND password_hash = ${userLogin.password};
    `) as UserDTO[];

    if (user.length === 0) {
      return null;
    }
    return user[0];
  }

  async login(userLogin: UserLoginDTO): Promise<UserAutenticateDTO | null> {
    const user = (await this._db.$queryRaw`
    SELECT
      id,
      campus_id,
      user_type,
      user_name,
      email
    FROM
      tb_user
    WHERE
      email = ${userLogin.email} AND password_hash = ${userLogin.password};
    `) as tb_user[];

    if (user.length === 0) {
      return null;
    }

    return {
      userId: user[0].id,
      username: user[0].user_name,
      campusId: user[0].campus_id,
      userType: user[0].user_type,
      email: user[0].email,
    };
  }

  async consultUser(consultUser: ConsultUserDTO): Promise<boolean> {
    const row = await this._db.$queryRaw`
    SELECT email, registration 
    FROM tb_user
    WHERE email = ${consultUser.email}
    OR registration = ${consultUser.registration};
    ` as ConsultUserDTO[];

    if (row.length === 0) {
      return false;
    }
    return true;
  }
}