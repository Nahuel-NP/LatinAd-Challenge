import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { DEFAULT_APP_CONTEXT_VALUES } from "../lib/contants";

export const Navbar = () => {
  const { saveCredentials } = useContext(AppContext);

  const logout = () => {
    saveCredentials(DEFAULT_APP_CONTEXT_VALUES.userCredentials);
  };
  return (
    <nav className="z-[100] w-full  bg-dodger-blue-950">
      <div className="container flex items-center justify-between p-4 mx-auto font-poppins">
        <Link to="/" className="text-2xl font-semibold text-white uppercase">
          Front<span className="font-bold text-dodger-blue-600">End</span>
        </Link>
        <button
          onClick={logout}
          className="px-4 py-2 font-semibold text-white transition-colors border rounded-full border-dodger-blue-800 bg-dodger-blue-800 hover:bg-dodger-blue-700"
        >
          Cerrar Sessión
        </button>
      </div>
    </nav>
  );
};
