import { Navbar } from "@/components/ui/navbar";
import { Outlet } from "@tanstack/react-router";


export const MainPage = () => {
  return (
    <div className="bg-gray-100">
      <Navbar />
      <Outlet />
    </div>
  );
}
