import { Request, Response } from "express";
import { ObjectCreateDTO } from "../entities/IObject";
import { ObjectRepository } from "../repositories/object.repository";


export class ObjectController {
  private _objectRepository: ObjectRepository = new ObjectRepository();

  constructor() { }

  registerNewObject = (req: Request, res: Response, file: any) => {
    console.log("oi")
    try {
      // Os dados de texto (name, category, description) caem aqui:
      const { name, category, description } = req.body;
      console.log(name, category, description)

      // As informações do arquivo salvo caem aqui:
      const imageFile = (req as any).file;

      if (!imageFile) {
        return res.status(400).json({ error: "Por favor, selecione uma imagem." });
      }

      console.log("Dados recebidos:", { name, category, description });
      console.log("Arquivo salvo em:", imageFile.path);

      // Aqui você salvaria essas informações no seu banco de dados (ex: Prisma)

      return res.json({
        message: "Objeto registrado com sucesso!",
        data: {
          name,
          category,
          description,
          imageUrl: `/uploads/${imageFile.filename}` // Caminho para salvar no banco
        }
      });

    } catch (error) {
      return res.status(500).json({ error: "Erro interno no servidor." });
    }
  };

  getAllObjectsByCampus = async (req: Request, res: Response) => {
    const idCampus = Number(req.params.id);

    try {
      const objects = await this._objectRepository.getAllObjectsByCampus(idCampus);

      return res.status(200).json(objects);
    } catch (error) {
      console.error("Erro ao obter objetos:", error);
      return res.status(500).json({ message: "Erro interno do servidor." });
    }
  }

  getObjectById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    try {
      const object = await this._objectRepository.getObjectById(id);
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
    const id = Number(req.params.id);
    const objectData: ObjectCreateDTO = req.body;

    try {
      const updatedObject = await this._objectRepository.updateObjectById(id, objectData);
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
