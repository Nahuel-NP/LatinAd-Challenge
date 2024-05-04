import { useNavigate } from "react-router-dom";

export const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <section className="grid min-h-svh bg-dodger-blue-950 place-items-center">
      <div className="flex flex-col">
        <div className="relative">
          <h1 className="text-white text-7xl md:text-8xl text-latinBlue">
            LATIN<span className="font-bold text-dodger-blue-600">AD</span>
          </h1>
          <p className="absolute right-0 px-2 text-base font-bold text-center text-black uppercase bg-orange-500 rounded-full -rotate-3">
            Challenge
          </p>
        </div>
        <h2 className="text-white">
          <span>404</span> Página no encontrada
        </h2>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 mx-auto mt-8 font-bold text-white bg-orange-500 rounded-lg hover:bg-orange-700"
        >
          Volver
        </button>
      </div>
    </section>
  );
};
