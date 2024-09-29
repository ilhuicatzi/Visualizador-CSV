import { Request, Response, Router } from "express";
import { csvData } from "../db/dataStore";

const router = Router();

router.get("/users", (req: Request, res: Response) => {

  const { q } = req.query;
  if(!q){
    res.status(400).json({ message: "No se ha enviado el parametro de busqueda" });
  }
  if(Array.isArray(q)){
    res.status(400).json({ message: "El parametro de busqueda no puede ser un arreglo" });
  }

  const search = q?.toString().toLowerCase() || "";

  const filteredData = csvData.filter(row => {
    return Object.values(row).some(value => value.toString().toLowerCase().includes(search));
  });

  res.status(200).json({ data: filteredData });
  });

export default router;