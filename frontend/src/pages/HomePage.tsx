import FormUploadCSV from "@/components/upload/FormUploadCSV"
function HomePage() {
  return (
    <div>
      <section className="w-full flex justify-center items-center flex-col my-20 p-5">
        <h1 className="text-4xl font-semibold mb-4">Visualiza tu CSV</h1>
        <span className="border-t w-96 border-muted"></span>
        <p className="text-muted-foreground text-center">Sube tu archivo CSV y visualiza su contenido</p>
        <FormUploadCSV />
      </section>
    </div>
  )
}

export default HomePage