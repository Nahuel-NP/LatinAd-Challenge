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
    <nav>
      <div className="container flex items-center justify-between p-4 mx-auto font-poppins">
        <Link to="/" className="text-2xl uppercase text-latinBlue">
          Latin<span className="font-bold text-black">Ad</span>
        </Link>
        <button
          onClick={logout}
          className="px-4 py-2 text-white transition-colors rounded-md hover:bg-blue-600 bg-latinBlue"
        >
          Cerrar Sessión
        </button>
      </div>
    </nav>
  );
};
