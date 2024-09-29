import { ApiUploadResponse, type Data } from "@/types/types";

export const uploadFile = async (file: File): Promise<[Error?, Data?]> => {
  if (!file) {
    return [new Error("No se ha seleccionado ningún archivo.")];
  }

  if (file.type !== "text/csv") {
    return [new Error("Solo se permiten archivos de tipo CSV.")];
  }

  const formData = new FormData();
  formData.append("dataFile", file);

  try {
    const response = await fetch("http://localhost:3000/api/files", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      return [new Error(`Error al subir el archivo: ${file.name}. Detalles: ${errorText}`)];
    }

    const jsonResponse = await response.json();
    if (!jsonResponse.data) {
      return [new Error("El servidor no devolvió los datos esperados.")];
    }

    const { data } = jsonResponse as ApiUploadResponse;
    return [undefined, data];
  } catch (error) {
    console.error("Error durante la subida del archivo:", error);
    if (error instanceof Error) {
      return [new Error(`Error en la solicitud: ${error.message}`)];
    }
  }

  return [new Error("Ha ocurrido un error desconocido")];
};
