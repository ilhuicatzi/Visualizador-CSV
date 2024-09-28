import { Request, Response } from "express";
import csvToJson from "convert-csv-to-json";

export const uploadFile = async (req: Request, res: Response) => {
  let jsonFile: Array<Record<string, string>> = [];
  const { file } = req;
  if (!file) {
    res.status(400).json({ message: "No se ha cargado ningun archivo" });
    return;
  }

  if (file?.mimetype !== "text/csv") {
    res.status(400).json({ message: "El archivo debe ser de tipo CSV" });
  }

  try {
    const rawCsv = Buffer.from(file.buffer).toString("utf-8");
    console.log(rawCsv);
    const dataFile = csvToJson.fieldDelimiter(',').csvStringToJson(rawCsv);
    jsonFile = dataFile;
  } catch (error) {
    res.status(500).json({ message: "Error al cargar el archivo" });
  }

  res
    .status(200)
    .json({ data: jsonFile, message: "El archivo se cargo correctamente" });
};
