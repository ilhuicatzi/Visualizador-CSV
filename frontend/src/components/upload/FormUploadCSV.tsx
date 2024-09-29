import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const FormSchema = z.object({
  dataFile: z.instanceof(File).refine((file) => file.type === "text/csv", {
    message: "El archivo debe ser un CSV",
  }),
});

function FormUploadCSV() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      dataFile: undefined,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
        const formData = new FormData();
        formData.append("dataFile", data.dataFile as File);
    
        const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
        });
    
        if (response.ok) {
            const { data } = await response.json();
            console.log(data);
        } else {
            console.error("Error al subir el archivo");
        }
        
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <article className="md:px-20 w-full flex justify-center items-center mt-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-sm space-y-6"
        >
          <FormField
            control={form.control}
            name="dataFile"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="archivo">Archivo.csv</FormLabel>
                <FormControl>
                  <Input
                    id="archivo"
                    accept=".csv"
                    className="px-5 bg-muted"
                    type="file"
                    onChange={(e) => field.onChange(e.target.files?.[0])}
                    onBlur={field.onBlur}
                    name={field.name}
                    ref={field.ref}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end gap-3">
            <Button type="submit">Subir archivo</Button>

            <div className="hidden">
              <Button variant="outline" type="button">
                Visualizar
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </article>
  );
}

export default FormUploadCSV;
