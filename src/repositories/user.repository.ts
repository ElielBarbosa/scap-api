import { PrismaClient, tb_user } from "@prisma/client";
import { prisma } from "../prisma";
import { UserCreateDTO, UserDTO } from "../entities/IUser";

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

  async auth(email: string, password: string): Promise<UserDTO | null> {
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
      email = ${email} AND password_hash = ${password};
    `) as UserDTO[];

    if (user.length === 0) {
      return null;
    }
    return user[0];
  }
}
