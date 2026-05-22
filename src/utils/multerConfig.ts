import multer from "multer";
import path from "node:path";

const configureUpload = (folderUpload = 'uploads/') => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // Define a pasta dinamicamente
      cb(null, folderUpload);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    }
  });

  // Retorna a instância do multer pronta
  return multer({ storage: storage });
};

export default configureUpload;