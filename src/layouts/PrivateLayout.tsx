import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { Navbar } from "../components/Navbar";
import { Toaster } from "sonner";
import { DeleteDialog } from "../components/shared/DeleteDialog";

export const PrivateLayout = () => {
  const { userCredentials } = useContext(AppContext);

  if (userCredentials.isLogged) {
    return (
      <main className="relative min-h-screen">
        <Navbar />
        <Outlet />
        <DeleteDialog/>
        <Toaster richColors/>
      </main>
    );
  }
  return <Navigate to="/log-in" />;
};
