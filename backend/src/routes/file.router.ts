import { Router} from "express";
import multer from "multer";
import { uploadFile } from "../controllers/file.controller";



const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = Router();

router.post("/files", upload.single('file') , uploadFile);

  export default router;