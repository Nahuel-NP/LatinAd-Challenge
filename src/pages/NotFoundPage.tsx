export const NotFoundPage = () => {
  return (
    <section className="grid min-h-svh bg-dodger-blue-950 place-items-center">
      <div>
      <div className="relative">
        <h1 className="text-white text-7xl md:text-8xl text-latinBlue">
          LATIN<span className="font-bold text-dodger-blue-600">AD</span>
        </h1>
        <p className="absolute right-0 px-2 text-base font-bold text-center text-black uppercase bg-orange-500 rounded-full -rotate-3">
          Challenge
        </p>
      </div>
        <h2 className="text-white"><span>404</span> Página no encontrada</h2>
      </div>
    </section>
  );
};
