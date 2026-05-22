import { PrismaClient, tb_object, tb_user } from "@prisma/client";
import { prisma } from "../prisma";
import { ObjectCreateDTO } from "../entities/IObject";

export class ObjectRepository {
  private _db: PrismaClient = prisma;
  constructor() { }

  async registerNewObject({ name, description, status, locationFound, objectImage, registeredObject, removedBy, campusId }: ObjectCreateDTO): Promise<tb_object> {
    const row = await this._db.$queryRaw`
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
    ${locationFound},
    ${objectImage},
    ${registeredObject},
    ${removedBy},
    ${campusId}) returning 
    name_objetct, 
    description,
    status,
    location_found,
    object_image,       
    registered_object,  
    removed_by,         
    campus_id` as tb_object;

    return row;
  }


  async getAllObjectsByCampus(campus_id: number): Promise<tb_object[] | null> {
    console.log(campus_id);

    const objects = await this._db.$queryRaw`
    SELECT id,
        name_objetct,
        description,
        status,
        location_found,
        object_image,
        registered_object,
        removed_by,
        campus_id FROM tb_object WHERE campus_id = ${campus_id}
    ` as tb_object[];

    if (objects.length === 0) {
      return null;
    }
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
    const { name, description, status, locationFound, objectImage, registeredObject, removedBy, campusId } = data;
    const objectUpdate = await this._db.$queryRaw`
    UPDATE tb_object SET
    name_objetct = COALESCE(${name}, name_objetct),
    description = COALESCE(${description}, description),
    status = COALESCE(${status}, status),
    location_found = COALESCE(${locationFound}, location_found),
    object_image = COALESCE(${objectImage}, object_image),
    registered_object = COALESCE(${registeredObject}, registered_object),
    removed_by = COALESCE(${removedBy}, removed_by),
    campus_id = COALESCE(${campusId}, campus_id)
    WHERE id = ${id} returning *;
    `;

    return objectUpdate;
  }
}
