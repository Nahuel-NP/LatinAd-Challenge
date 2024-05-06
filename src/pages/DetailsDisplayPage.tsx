import { useContext, useEffect, useState } from "react";
import { BASE_URL } from "../lib/contants";
import { AppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";
import { MessageResult } from "../components/shared/MessageResult";
import useViewTransition from "../hooks/useVIewTransition";
import { EditDisplayForm } from "../components/display/EditDisplayForm";

export const DetailsDisplayPage = () => {
  const params = useParams();
  const { userCredentials, activeDisplay, setActiveDisplay } =
    useContext(AppContext);

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
        setActiveDisplay(data);
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
    if (!activeDisplay || activeDisplay.id !== +params.id!) {
      fetchDysplayById(+params.id!);
    }
  }, []);

  const [showForm, setShowForm] = useState(false);
  const toggleShowForm = () => {
    setShowForm(!showForm);
  };

  const backToHome = () => {
    handletransition("/");
  };

  return (
    <section className="flex flex-col flex-1 h-full bg-gray-100 ">
      {hasError && <MessageResult message="Ocurrió un error inesperado" />}
      {isLoading && <MessageResult message="Cargando..." />}
      {!isLoading && !hasError && (
        <div className="container grid flex-1 grid-rows-[auto_1fr] lg:grid-rows-1 p-4 mx-auto lg:grid-cols-7">
          <aside className="flex flex-col items-center p-4 lg:col-span-2">
            <button
              className="self-start p-2 text-white bg-orange-500 rounded-md"
              onClick={backToHome}
            >
              Volver
            </button>
            <h2 className="w-full pb-2 mb-4 text-xl text-center border-b-2">
              Editar display
            </h2>
            <button
              onClick={toggleShowForm}
              className="px-4 py-2 my-2 text-white bg-orange-500 rounded-lg justify-self-center lg:hidden"
            >
              {showForm ? "Ocultar formulario" : "Ver formulario"}
            </button>
            <div
              style={{ transition: "max-height ease-in 0.3s" }}
              className={`overflow-hidden max-h-0 lg:max-h-full  ${
                showForm ? "max-h-full" : "max-h-0 lg:max-h-full"
              }`}
            >
              <EditDisplayForm />
            </div>
          </aside>
          <div className="p-4 border-t-2 lg:border-l-2 lg:border-t-0 lg:col-span-5">
            <section
              style={{ viewTransitionName: `card-${params.id}` }}
              className="grid w-full max-w-screen-md gap-4 p-4 mx-auto bg-white md:grid-cols-2 rounded-xl"
            >
              <div className="overflow-hidden rounded-lg aspect-square">
                <img
                  width={300}
                  height={300}
                  className="object-cover w-full h-full max-w-lg "
                  src={activeDisplay?.picture_url}
                  alt={activeDisplay?.name}
                />
              </div>

              <div className="[&>p]:text-lg lg [&>p]:text-gray-600 [&>p>span]:text-dodger-blue-950  [&>p>span]:font-semibold">
                <h3 className="text-2xl font-bold text-dodger-blue-950">
                  {activeDisplay?.name}
                </h3>
                <p>
                  <span>Tipo:</span> {activeDisplay?.type}
                </p>
                <p>
                  <span>Resolución:</span> {activeDisplay?.resolution_width} x{" "}
                  {activeDisplay?.resolution_height}
                </p>
                <p>
                  <span>Precio x día:</span> ${activeDisplay?.price_per_day}
                </p>
                <p className="text-gray-600 ">
                  <span className="font-semibold text-dodger-blue-950">
                    Descripción:
                  </span>{" "}
                  {activeDisplay?.description}
                </p>
              </div>
            </section>
          </div>
        </div>
      )}
    </section>
  );
};
