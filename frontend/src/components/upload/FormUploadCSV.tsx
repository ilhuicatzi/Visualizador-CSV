import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Toaster, toast } from 'sonner'
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
import ViewTableData from "./ViewTableData";
import { uploadFile } from "@/services/uploadFile";
import { useState } from "react";
import { Data } from "@/types/types";

const APP_STATUS = {
  IDLE: "idle",
  READY_TO_UPLOAD: "ready_to_upload",
  UPLOADING: "uploading",
  ERROR: "error",
  SUCCESS: "success",
  NEXT: "next",
} as const;

const BUTTON_TEXT = {
  [APP_STATUS.READY_TO_UPLOAD]: "Subir archivo",
  [APP_STATUS.UPLOADING]: "Subiendo archivo...",
  [APP_STATUS.SUCCESS]: "Archivo subido",
} 


type AppStatus = typeof APP_STATUS[keyof typeof APP_STATUS];

const FormSchema = z.object({
  dataFile: z.instanceof(File).refine((file) => file.type === "text/csv", {
    message: "El archivo debe ser un CSV",
  }),
});

function FormUploadCSV() {
  const [status, setStatus] = useState<AppStatus>(APP_STATUS.IDLE);
  const [jsonData, setJsonData] = useState<Data>([]);
  const showButton = status === APP_STATUS.READY_TO_UPLOAD || status === APP_STATUS.UPLOADING;
  const showForm = status !== APP_STATUS.NEXT;
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      dataFile: undefined,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (status !== APP_STATUS.READY_TO_UPLOAD || !data.dataFile) {
      return;
    }
    const [error, responseData] = await uploadFile(data.dataFile);

    setStatus(APP_STATUS.UPLOADING);
    if (error) {
      setStatus(APP_STATUS.ERROR);
      console.log({ error });
      return toast.error(error.message);
    }
    
    if (responseData) {
      setJsonData(responseData);
      console.log({ responseData });
      setStatus(APP_STATUS.SUCCESS);
      toast.success("Archivo subido");
    }
  }

  const viewData = () => {
    setStatus(APP_STATUS.NEXT);
  }
  return (
    <article className="md:px-20 w-full flex justify-center items-center mt-10">
      <Toaster />
      {showForm && (
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
                    disabled ={status == APP_STATUS.UPLOADING}
                    onChange={(e) => {
                      field.onChange(e.target.files?.[0]);
                      setStatus(APP_STATUS.READY_TO_UPLOAD);
                    }}
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
            
            {
              showButton && (
              <Button variant="default" type="submit" disabled={status === APP_STATUS.UPLOADING}>
                {BUTTON_TEXT[status]}
              </Button>
              )
            }

            {
              status === APP_STATUS.SUCCESS && (
              <Button variant="outline" type="button" onClick={viewData}>
                Visualizar
              </Button>
              )
            }
          </div>
        </form>
      </Form>
      )}

      {status === APP_STATUS.NEXT && <ViewTableData data={jsonData} />}

    </article>
  );
}

export default FormUploadCSV;
