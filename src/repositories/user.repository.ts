import { PrismaClient, tb_user } from "@prisma/client";
import { prisma } from "../prisma";
import { UserCreateDTO, UserDTO, UserLoginDTO } from "../entities/IUser";
import { unknown } from "zod";

export class UserRepository {
  private _db: PrismaClient = prisma;
  constructor() { }

  async registerUser(dataUser: UserCreateDTO): Promise<tb_user | null> {
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
     ${dataUser.passwordHash},
     ${dataUser.campusId},
     ${dataUser.registration}
    ) RETURNING *;
    `) as tb_user[];

    if (newUser.length === 0) {
      return null;
    }
    return newUser[0];
  }

  async getUserById(id: number): Promise<UserCreateDTO | null> {
    const newUser = (await this._db.$queryRaw`
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

  async login(userLogin: UserLoginDTO): Promise<UserLoginDTO | null> {
    const user = (await this._db.$queryRaw`
    SELECT
      id,
      email,
      password_hash
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
      email: user[0].email,
      password: user[0].password_hash,
    };
  }
}
