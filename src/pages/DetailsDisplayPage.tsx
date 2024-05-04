import { useContext, useEffect, useState } from "react";
import { BASE_URL } from "../lib/contants";
import { AppContext } from "../context/AppContext";
import { Display } from "../lib/interfaces";
import { useParams } from "react-router-dom";
import { MessageResult } from "../components/shared/MessageResult";
import useViewTransition from "../hooks/useVIewTransition";

export const DetailsDisplayPage = () => {
  const params = useParams();

  const { userCredentials } = useContext(AppContext);
  const [display, setDisplay] = useState<Display>();
  const [isLoading, setLoading] = useState(false);
  const [hasError, setError] = useState(false);

  const { handletransition } = useViewTransition();

  const fetchDysplayById = async (id: number) => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/display/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userCredentials.token}`,
        },
      });

      const data = await response.json();

      if (data) {
        setDisplay(data);
      } else {
        setError(true);
      }
    } catch (error) {
      console.log(error);
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDysplayById(+params.id!);
  }, []);

  return (
    <section
      className="grid bg-gray-100 place-items-center "
      style={{ viewTransitionName: "view" }}
    >
      {hasError && <MessageResult message="Ocurrió un error inesperado" />}
      {isLoading && <MessageResult message="Cargando..." />}
      {!isLoading && !hasError && (
        <section className="grid w-full max-w-screen-md gap-4 p-4 mx-auto bg-white md:grid-cols-2 rounded-xl">
          <div className="overflow-hidden rounded-lg aspect-square">
            <img
              loading="lazy"
              width={300}
              height={300}
              className="object-cover w-full h-full max-w-lg "
              src={display?.picture_url}
              alt={display?.name}
            />
          </div>

          <div className="[&>p]:text-lg [&>p]:text-gray-600 [&>p>span]:text-dodger-blue-950  [&>p>span]:font-semibold">
            <button
              onClick={() => handletransition("/")}
              className="p-2 text-white transition-colors bg-orange-500 rounded-lg hover:bg-orange-700"
            >
              Volver
            </button>
            <h3 className="text-2xl font-bold text-dodger-blue-950">
              {display?.name}
            </h3>
            <p>
              <span>Tipo:</span> {display?.type}
            </p>
            <p>
              <span>Resolución:</span> {display?.resolution_width} x{" "}
              {display?.resolution_height}
            </p>
            <p>
              <span>Precio x día:</span> ${display?.price_per_day}
            </p>
            <p className="text-gray-600 ">
              <span className="font-semibold text-dodger-blue-950">
                Descripción:
              </span>{" "}
              {display?.description}
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
              ducimus cupiditate ad consequatur reiciendis! Temporibus animi
              neque rerum ad molestiae dolorum, fugit repellat ullam nihil
              maiores vitae cupiditate deleniti minima? Lorem ipsum dolor sit
              amet consectetur adipisicing elit. Aliquid enim sunt aspernatur
              eveniet voluptate repudiandae eos veniam itaque pariatur
              asperiores earum voluptatem optio, odio blanditiis ullam ipsa
              sequi perspiciatis hic?
            </p>
          </div>
        </section>
      )}
    </section>
  );
};
