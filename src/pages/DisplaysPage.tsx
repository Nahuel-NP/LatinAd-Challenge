import { useQuery } from "@tanstack/react-query";
import { DisplaysGrid } from "../components/display/DisplaysGrid";
import { BASE_URL, QUERY_KEY } from "../lib/contants";
import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { DisplayResponse } from "../lib/interfaces";
import { SearchBar } from "../components/display/SearchBar";
import { Pagination } from "../components/display/Pagination";
import { CreateDisplayForm } from "../components/display/CreateDisplayForm";
import { MessageResult } from "../components/shared/MessageResult";

export const Displays = () => {
  const { userCredentials, filters } = useContext(AppContext);

  const fetchDysplays = (
    pageSize: number,
    offset: number,
    name: string,
    type: string
  ): Promise<DisplayResponse> =>
    fetch(
      `${BASE_URL}/display?pageSize=${pageSize}&offset=${offset}&name=${name}&type=${type}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userCredentials.token}`,
        },
      }
    )
      .then((res) => res.json())
      .catch((error) => console.log(error));

  const { data, isFetching, isError } = useQuery({
    queryKey: [
      QUERY_KEY,
      userCredentials.email,
      filters.page,
      filters.name,
      filters.type,
      filters.perPage,

    ],
    queryFn: () =>
      fetchDysplays(
        filters.perPage,
        (filters.page - 1) * filters.perPage,
        filters.name,
        filters.type ?? ""
      ),
    staleTime: 60 * 1000 * 10,
  });

  const [showForm, setShowForm] = useState(false);
  const toggleShowForm = () => {
    setShowForm(!showForm);
  };

  return (
    <section className="flex flex-col flex-1 h-full bg-gray-100 " style={{viewTransitionName:'view'}}>
      <div className="container grid flex-1 grid-rows-[auto_1fr] lg:grid-rows-1 p-4 mx-auto lg:grid-cols-7">
        <aside className="flex flex-col items-center p-4 lg:col-span-2">
          <h2 className="w-full mb-4 text-xl text-center border-b-2">Crear nuevo display</h2>
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
            <CreateDisplayForm />
          </div>
        </aside>
        <div className="grid p-4 border-t-2 lg:border-l-2 lg:border-t-0 lg:col-span-5 grid-rows-wrapper">
          <SearchBar />

          <div className="mt-4">
            {isFetching && <MessageResult message="Cargando.." />}
            {isError && <MessageResult message="Ocurrió un error" />}
            {!isFetching && !isError && <DisplaysGrid data={data?.data!} />}
          </div>

          {data?.data.length && <Pagination totalCount={data?.totalCount!} />}
        </div>
      </div>
    </section>
  );
};
