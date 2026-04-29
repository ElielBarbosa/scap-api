import { PrismaClient, tb_user } from "@prisma/client";
import { prisma } from "../prisma";
import { ObjectCreateDTO } from "../entities/IObject";

export class ObjectRepository {
  private _db: PrismaClient = prisma;
  constructor() { }

  async registerNewObject({ name, description, status, location_found, object_image, registered_object, removed_by, campus_id }: ObjectCreateDTO): Promise<void> {
    const rows = await this._db.$queryRaw`
    INSERT INTO tb_object (
    name_objetct, 
    description,
    status,
    location_found,
    object_image,       
    registered_object,  
    removed_by,         
    campus_id           
    ) VALUES (
    ${name},
    ${description},
    ${status},
    ${location_found},
    ${object_image},
    ${registered_object},
    ${removed_by},
    ${campus_id}
);`
  }

  async getAllObjects() {
    const objects = await this._db.$queryRaw`
    SELECT * FROM tb_object
    `;
    return objects;
  }
  async getObjectById(id: number): Promise<any> {
    const objects = await this._db.$queryRaw`
    SELECT * FROM tb_object WHERE id = ${id}
    `;
    return objects;
  }

  async deleteObjectById(id: number): Promise<any> {
    return await this._db.$queryRaw`
    DELETE FROM tb_object WHERE id = ${id} returning *
    `;
  }

  async updateObjectById(id: number, data: Partial<ObjectCreateDTO>): Promise<any> {
    const { name, description, status, location_found, object_image, registered_object, removed_by, campus_id } = data;
    await this._db.$queryRaw`
    UPDATE tb_object SET
    name_objetct = COALESCE(${name}, name_objetct),
    description = COALESCE(${description}, description),
    status = COALESCE(${status}, status),
    location_found = COALESCE(${location_found}, location_found),
    object_image = COALESCE(${object_image}, object_image),
    registered_object = COALESCE(${registered_object}, registered_object),
    removed_by = COALESCE(${removed_by}, removed_by),
    campus_id = COALESCE(${campus_id}, campus_id)
    WHERE id = ${id} returning *
    `;
  }
}
