import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AppContext } from "../context/AppContext";

export const LoginLayout = () => {
  const { userCredentials } = useContext(AppContext);

  return !userCredentials.isLogged ? <Outlet /> : <Navigate to="/" />;
};
