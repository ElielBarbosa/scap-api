// src/controllers/authController.ts
import { Request, Response } from "express";


export class UploadController {

  constructor() { }

  imageObject = (req: Request, res: Response, file: any) => {
    try {
      // Os dados de texto (name, category, description) caem aqui:
      const { name, category, description } = req.body;

      // As informações do arquivo salvo caem aqui:
      const imageFile = (req as any).file;
      console.log(name, category, description)

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

}





export default UploadController;