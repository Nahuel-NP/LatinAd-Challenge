import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { Navbar } from "../components/Navbar";

export const PrivateLayout = () => {
  const { userCredentials } = useContext(AppContext);

  if (userCredentials.isLogged)
    return (
      <>
        <Navbar />
        <Outlet />
      </>
    );

  return <Navigate to="/login" />;
};
