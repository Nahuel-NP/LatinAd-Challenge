import { useQuery } from "@tanstack/react-query";
import { DisplaysGrid } from "../components/display/DisplaysGrid";
import { BASE_URL } from "../lib/contants";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { DisplayResponse } from "../lib/interfaces";
import { SearchBar } from "../components/display/SearchBar";
import { Pagination } from "../components/display/Pagination";

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
    ).then((res) => res.json()).catch(error=>console.log(error));

  const { data, isFetching, isError } = useQuery({
    queryKey: [
      "displays",
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

  return (
    <section className="flex flex-col pt-[72px] bg-gray-100 min-h-svh">
      <div className="container grid flex-1 grid-rows-1 p-4 mx-auto lg:grid-cols-5">
        <aside className="col-span-1 p-6 ">
          <h2>hola</h2>
        </aside>
        <div className="grid p-4 border-l-2 border-gray-300 lg:col-span-4 grid-rows-wrapper">
          <SearchBar />

          <div className="p-8 ">
            {isFetching && (
              <div className="grid w-full h-full place-items-center">
                <p className="text-2xl font-bold text-dodger-blue-950">Cargando...</p>
              </div>
            )}
            {!isFetching && !isError && <DisplaysGrid data={data?.data!} />}
          </div>

          {!isFetching && !isError && (
            <Pagination totalCount={data?.totalCount!} />
          )}
        </div>
      </div>
    </section>
  );
};
