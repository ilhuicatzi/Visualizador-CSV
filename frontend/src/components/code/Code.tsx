interface ColorProps {
    color?: "red" | "blue" | "green" | "red" | "yellow" | "rose" | "purple" ; // Hacemos opcional el color
  }
  
  function Code({
    children,
    color = "primary" as ColorProps["color"],
  }: {
    children: React.ReactNode;
    color?: ColorProps["color"];
  }) {
    const colorClass = {
      rose: "text-rose-600",
      blue: "text-blue-600",
      green: "text-green-600",
      red: "text-red-600",
      yellow: "text-yellow-600",
      purple: "text-purple-600",
      primary: "text-primary", // Clase para el color por defecto
    };
  
    const selectedColor = color ? colorClass[color] : ""; // Ensure color is defined
  
    return (
      <code
        className={`dark:bg-zinc-900 bg-zinc-100 rounded shadow dark:shadow-muted font-inconsolata select-all px-1 font-medium ${selectedColor}`}
      >
        {children}
      </code>
    );
  }
  
  export default Code;