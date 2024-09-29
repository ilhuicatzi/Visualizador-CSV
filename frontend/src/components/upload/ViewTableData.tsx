import { Data } from "@/types/types";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function ViewTableData({ data }: { data: Data }) {
  // Verificamos si hay datos antes de intentar renderizar la tabla.
  if (!data || data.length === 0) {
    return <p>No hay datos para mostrar</p>;
  }

  return (
    <div>
      <Table>
        <TableCaption>Tabla de datos</TableCaption>
        <TableHeader>
          <TableRow>
            {/* Mapea las claves como encabezados de columnas */}
            {Object.keys(data[0]).map((key) => (
              <TableHead key={key}>{key}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Mapea las filas de datos */}
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {/* Mapea los valores de cada fila y los coloca en las celdas correspondientes */}
              {Object.values(row).map((value, cellIndex) => (
                <TableCell key={cellIndex}>{value}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default ViewTableData;
