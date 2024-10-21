import { AuthState } from "@/state/auth";
import { Link } from "@tanstack/react-router"
import { useRecoilValue } from "recoil";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./dropdown-menu"
import { Button } from "./button"
import { ChevronDown } from "lucide-react"


export const Navbar = () => {
  const authState = useRecoilValue(AuthState);
  return (
    <header className="w-full border-b bg-white">
      <div className="container mx-auto flex items-center justify-between py-4">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-2xl font-bold">
            TestYou
          </Link>
          <nav className="hidden md:flex space-x-4">
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
          {authState.user
            ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    {authState.user.lastName} {authState.user.name}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <Link to="/profile">
                    <DropdownMenuItem>
                      Profile
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/auth" className="text-sm font-medium">
                Authenticate
              </Link>
            )
          }
        </div>
      </div>
    </header>
  )
}