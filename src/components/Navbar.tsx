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
    <nav className="fixed w-full bg-latinBlue">
      <div className="container flex items-center justify-between p-4 mx-auto font-poppins">
        <Link to="/" className="text-2xl uppercase text-balck">
          Latin<span className="font-bold text-white">Ad</span>
        </Link>
        <button
          onClick={logout}
          className="px-4 py-2 text-black transition-colors bg-white rounded-md hover:bg-blue-600"
        >
          Cerrar Sessión
        </button>
      </div>
    </nav>
  );
};
