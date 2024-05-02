import { Display } from "../../lib/interfaces";

export const DisplayCard = (display: Display) => {
  return (
    <section className="flex flex-col max-w-md overflow-hidden border border-gray-400 rounded-lg shadow-sm">
      <div className="flex w-full ">
        <img
          className="object-cover w-1/3"
          src={display.picture_url}
          alt={`imagen de ${display.name}`}
        />

        <div className="flex flex-col w-2/3 gap-2 p-4 text-sm md:p-4">
          <h3 className="text-xl font-bold text-gray-800">{display.name}</h3>

          <p className="text-gray-600 ">{display.description}</p>
          <p className="flex items-center gap-2 ">
            Dimensiones: {display.resolution_width} x{" "}
            {display.resolution_height}
          </p>

          <p className="">Tipo: {display.type}</p>
          <p className="">Precio por dia: ${display.price_per_day}</p>
        </div>
      </div>
    </section>
  );
};
