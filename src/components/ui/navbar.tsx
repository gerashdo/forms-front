import { Link } from "@tanstack/react-router"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./dropdown-menu"
// import { Button } from "./button"
// import { ChevronDown } from "lucide-react"


export const Navbar = () => {
  return (
    <header className="w-full border-b">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-2xl font-bold">
            TestYou
          </Link>
          <nav className="hidden md:flex space-x-4">
            <Link className="text-sm font-medium">
              Create Template
            </Link>
            <Link className="text-sm font-medium">
              Users
            </Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          {/* <Button variant="outline" size="sm" onClick={() => setShowCommandModal(true)}>
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button> */}
          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                John Doe
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}
          <Link to="/auth" className="text-sm font-medium">
            Authenticate
          </Link>
        </div>
      </div>
    </header>
  )
}