import { AuthState } from "@/state/auth";
import { Link } from "@tanstack/react-router"
import { useRecoilState } from "recoil";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/ui/ModeToggle";
import { isUserAdmin } from "@/helpers/auth";
import { ChevronDown } from "lucide-react"


export const Navbar = () => {
  const [authState, setAuthState] = useRecoilState(AuthState);
  const onLogout = () => {
    setAuthState({
      user: null,
      token: null,
    })
  }

  return (
    <header className="w-full border-b border-neutral-200 bg-white text-neutral-950 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50">
      <div className="container mx-auto flex items-center justify-between py-4">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-3xl font-bold">
            TestYou
          </Link>
          <nav className="hidden md:flex space-x-4 ps-20">
            {authState.user && isUserAdmin(authState.user) && (
              <Link
                to="/users"
                className="text-sm font-medium"
              >
                Users
              </Link>
            )}
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          {/* <Button variant="outline" size="sm" onClick={() => setShowCommandModal(true)}>
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button> */}
          {authState.user ? (
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
                <DropdownMenuItem onClick={onLogout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/auth" className="text-sm font-medium">
              Authenticate
            </Link>
          )}
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}