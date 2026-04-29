import { Request, Response } from "express";
import { ObjectCreateDTO } from "../entities/IObject";
import { ObjectRepository } from "../repositories/object.repository";


export class ObjectController {
  private _objectRepository: ObjectRepository = new ObjectRepository();

  constructor() { }

  registerNewObject = async (req: Request, res: Response) => {
    const objectData: ObjectCreateDTO = req.body;

    try {
      await this._objectRepository.registerNewObject(objectData);
      return res.status(201).json({ message: "Objeto registrado com sucesso." });
    } catch (error) {
      console.error("Erro ao registrar objeto:", error);
      return res.status(500).json({ message: "Erro interno do servidor." });
    }
  };

  getAllObjects = async (req: Request, res: Response) => {
    try {
      const objects = await this._objectRepository.getAllObjects();
      return res.status(200).json(objects);
    } catch (error) {
      console.error("Erro ao obter objetos:", error);
      return res.status(500).json({ message: "Erro interno do servidor." });
    }
  }

  getObjectById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const object = await this._objectRepository.getObjectById(Number(id));
      if (!object) {
        return res.status(404).json({ message: "Objeto não encontrado." });
      }
      return res.status(200).json(object);
    } catch (error) {
      console.error("Erro ao obter objeto:", error);

      return res.status(500).json({ message: "Erro interno do servidor." });
    }
  }

  updateObjectById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const objectData: ObjectCreateDTO = req.body;

    try {
      const updatedObject = await this._objectRepository.updateObjectById(Number(id), objectData);
      if (!updatedObject) {
        return res.status(404).json({ message: "Objeto não encontrado." });
      }

      return res.status(200).json(updatedObject);
    } catch (error) {
      console.error("Erro ao atualizar objeto:", error);
      return res.status(500).json({ message: "Erro interno do servidor." });
    }
  }

  deleteObjectById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const deleted = await this._objectRepository.deleteObjectById(Number(id));
      if (!deleted) {
        return res.status(404).json({ message: "Objeto não encontrado." });
      }
      return res.status(200).json({ message: "Objeto deletado com sucesso." });
    } catch (error) {
      console.error("Erro ao deletar objeto:", error);
      return res.status(500).json({ message: "Erro interno do servidor." });
    }

  }
}
