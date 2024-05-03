import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { Toaster } from "sonner";

export const LoginLayout = () => {
  const { userCredentials } = useContext(AppContext);

  return !userCredentials.isLogged ? (
    <main>
      <Outlet />
      <Toaster position="bottom-center" richColors />
    </main>
  ) : (
    <Navigate to="/" />
  );
};
