import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { Navbar } from "../components/Navbar";

export const PrivateLayout = () => {
  const { userCredentials } = useContext(AppContext);

  if (userCredentials.isLogged) {
    return (
      <main className="relative min-h-screen">
        <Navbar />
        <Outlet />
      </main>
    );
  }
  return <Navigate to="/login" />;
};
