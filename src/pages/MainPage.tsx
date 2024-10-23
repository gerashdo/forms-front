import { Navbar } from "@/components/ui/navbar";
import { Outlet } from "@tanstack/react-router";


export const MainPage = () => {
  return (
    <div className="bg-neutral-100 dark:bg-neutral-950">
      <Navbar />
      <Outlet />
    </div>
  );
}
