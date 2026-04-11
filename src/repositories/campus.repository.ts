import { PrismaClient } from "@prisma/client";
import { CampusDTO } from "../entities/ICampus.js";
import { prisma } from "../prisma.js";

export class CampusRepository {
  private db: PrismaClient = prisma;
  constructor() {}

  async registerCampus(address: string, city: string): Promise<number> {
    const idNewCampus: number = (await this.db.$queryRaw`
    INSERT INTO tb_campus (
      address,
      city
    ) VALUES (
      ${address},
      ${city} 
    ) RETURNING id;
    `) as number;

    console.log(typeof idNewCampus);
    return idNewCampus;
  }
  async getCampusList(): Promise<CampusDTO[] | null> {
    const campusList: CampusDTO[] = (await this.db.$queryRaw`
    SELECT * FROM tb_campus;
    `) as CampusDTO[];

    if (campusList.length == 0) {
      return null;
    }

    return campusList;
  }
}
