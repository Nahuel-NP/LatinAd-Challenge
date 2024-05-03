import { useQuery } from "@tanstack/react-query";
import { DisplaysGrid } from "../components/display/DisplaysGrid";
import { BASE_URL, QUERY_KEY } from "../lib/contants";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { DisplayResponse } from "../lib/interfaces";
import { SearchBar } from "../components/display/SearchBar";
import { Pagination } from "../components/display/Pagination";
import { CreateDisplayForm } from "../components/display/CreateDisplayForm";

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
      <div className="container grid flex-1 grid-rows-1 p-4 mx-auto lg:grid-cols-7">
        <aside className="p-4 lg:col-span-2 ">
          <h2 className="text-xl font-semibold text-center border-b">
            Nuevo Display
          </h2>
          <CreateDisplayForm />
        </aside>
        <div className="grid border-t-2 border-gray-300 lg:border-l-2 lg:border-t-0 lg:col-span-5 grid-rows-wrapper">
          <SearchBar />

          <div className="p-4 ">
            {isFetching && (
              <div className="grid w-full h-full place-items-center">
                <p className="text-2xl font-bold text-dodger-blue-950">
                  Cargando...
                </p>
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
