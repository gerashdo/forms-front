import { Navbar } from "@/components/ui/navbar";
import { Outlet } from "@tanstack/react-router";


export const MainPage = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
