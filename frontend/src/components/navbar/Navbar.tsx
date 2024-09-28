import { Link } from "react-router-dom"
import { ModeToggle } from "./ModeToggle"
import { MenuColapse } from "./MenuColapse"

function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4">
        <Link to="/" className="text-3xl font-bold">App</Link>
        <div className="hidden sm:flex items-center gap-3">
            <Link to="/" className="px-3 py-1.5 hover:bg-muted rounded-md">Home</Link>
            <Link to="/about" className="px-3 py-1.5 hover:bg-muted rounded-md">About</Link>
            <ModeToggle />
        </div>
        <MenuColapse />
    </nav>
  )
}

export default Navbar