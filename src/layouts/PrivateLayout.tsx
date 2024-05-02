import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { Navbar } from "../components/Navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const PrivateLayout = () => {
  const { userCredentials } = useContext(AppContext);

  if (userCredentials.isLogged) {
    const queryClient = new QueryClient();
    return (
      <main className="relative min-h-screen">
        <Navbar />
        <QueryClientProvider client={queryClient}>
          <Outlet />
        </QueryClientProvider>
      </main>
    );
  }
  return <Navigate to="/login" />;
};
