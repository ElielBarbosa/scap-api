import { request, response } from "express";
import express from "express";
import multer from "multer";
import path from 'path';
import UploadController from "../controllers/upload.controller";


// 1. Configuração de armazenamento do Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define a pasta onde as imagens serão salvas localmente
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Cria um nome único para o arquivo combinando a data atual e o nome original
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// Inicializa o middleware do Multer com a configuração de storage
const upload = multer({ storage: storage });

export const uploadRouter = express.Router();
const uploadController = new UploadController();



uploadRouter.post('/', upload.single('image'), uploadController.imageObject)

