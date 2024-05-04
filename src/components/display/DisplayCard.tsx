import { useContext } from "react";
import { Display } from "../../lib/interfaces";
import { AppContext } from "../../context/AppContext";


export const DisplayCard = (display: Display) => {
  const { setShowDeleteDialog,setActiveDisplay } = useContext(AppContext);



  const handleDelete = (dispay:Display) => {
    setShowDeleteDialog(true);
    setActiveDisplay(dispay)
  };
  return (
    <section className="grid grid-cols-3 grid-rows-[1fr_auto_auto] gap-2 p-4  bg-white  rounded-xl  max-w-sm mx-auto">
      <div className="overflow-hidden rounded-lg ">
        <img
          className="object-cover w-full h-full"
          src={display.picture_url}
          alt={display.name}
        />
      </div>

      <div className="relative col-span-2  p-2 rounded-lg text-dodger-blue-950 [&>p>span]:font-semibold [&>p]:text-gray-600">
        <h3 className="text-xl font-bold ">{display.name}</h3>
        <p>
          {" "}
          <span>Tipo:</span> {display.type}
        </p>
        <p>
          <span>Resolución:</span> {display.resolution_width} x{" "}
          {display.resolution_height}
        </p>
        <p>
          <span>Precio x día:</span> ${display.price_per_day}
        </p>
      </div>
      <div className="col-span-3 p-2 border-b">
        <p className="text-gray-600 line-clamp-2">
          <span className="font-semibold text-dodger-blue-950">
            Descripción:
          </span>{" "}
          {display.description}
        </p>
      </div>
      <div className="flex justify-end col-span-3 gap-8 uppercase rounded-lg">
        <button
          onClick={() => handleDelete(display)}
          className="font-semibold text-red-500 transition-transform hover:scale-105"
        >
          Eliminar
        </button>
        <button className="font-semibold text-orange-500 transition-transform hover:scale-105">
          Editar
        </button>
        <button className="font-semibold transition-transform text-dodger-blue-600 hover:scale-105">
          Ver Más
        </button>
      </div>
    </section>
  );
};
