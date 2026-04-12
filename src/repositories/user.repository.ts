import { PrismaClient, tb_user } from "@prisma/client";
import { prisma } from "../prisma";
import { UserDTO } from "../entities/IUser";

export class UserRepository {
  private _db: PrismaClient = prisma;
  constructor() { }

  async registerUserSchema(dataUser: UserDTO): Promise<tb_user | null> {
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

  async getUserById(id: number): Promise<UserDTO | null> {
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
    `) as UserDTO[];

    if (newUser.length === 0) {
      return null;
    }
    return newUser[0];
  }
}
