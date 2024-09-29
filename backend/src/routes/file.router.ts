import { Router } from "express";
import multer from "multer";
import { uploadFile } from "../controllers/file.controller";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = Router();

router.post(
  "/files",
  (req, res, next) => {
    upload.single("dataFile")(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        // Errores específicos de multer (como límites de tamaño)
        console.log(err);
        res.status(400).json({ message: err.message });
      } else if (err) {
        // Errores generales (como tipo de archivo incorrecto)
        console.log(err);
        res.status(400).json({ message: err.message });
      } else {
        next();
      }
    });
  },
  uploadFile
);

export default router;
