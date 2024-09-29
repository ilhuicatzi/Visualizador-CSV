// dataStore.ts

// Variable global para almacenar los datos CSV
export let csvData: Array<Record<string, string>> = [];

// Función para actualizar los datos de csvData
export const setCsvData = (data: Array<Record<string, string>>) => {
  csvData = data;
};
