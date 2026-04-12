import { Request, Response } from "express";
import { CampusDTO } from "../entities/ICampus.js";
import { CampusRepository } from "../repositories/campus.repository.js";
import { prisma } from "../prisma.js";

export class CampusController {
  private campusRepository: CampusRepository = new CampusRepository();

  constructor() {}

  registerNewCampus = async (req: Request, res: Response) => {
    const { address, city } = req.body;

    try {
      const newCampusData: number = await this.campusRepository.registerCampus(
        address,
        city,
      );
      res
        .json({
          messager: "Novo campus IFS registrado com sucesso!",
          id: newCampusData,
        })
        .status(201);
    } catch (err) {
      console.log(err);
      return res.json({ Error: "Algo deu errado no registro" }).status(500);
    }

    //verificar se o usuario existe

    //cadastrar usuario
  };

  getAllCampus = async (req: Request, res: Response) => {
    const campusList: CampusDTO[] | null =
      await this.campusRepository.getCampusList();
    res.json(campusList).status(200);
  };
}
