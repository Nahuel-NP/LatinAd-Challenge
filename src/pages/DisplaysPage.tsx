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
    ).then((res) => res.json());

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
    <section className="flex flex-col pt-[72px] bg-white min-h-svh">
      <div className="container grid flex-1 grid-rows-1 mx-auto lg:grid-cols-5 ">
        <aside className="col-span-1 p-6 ">
          <h2>hola</h2>
        </aside>
        <div className="grid p-4 border-l lg:col-span-4 grid-rows-wrapper">
          <header className="bg-gray-100 border-t border-gray-400 rounded-t-lg border-x justify-self-start-start">
            <SearchBar />
          </header>

          <div className="p-8 border border-gray-400 border-x">
            {isFetching && (
              <div className="grid w-full h-full place-items-center">
                <p>Loading...</p>
              </div>
            )}
            {!isFetching && !isError && <DisplaysGrid data={data?.data!} />}
          </div>

          {!isFetching && !isError && (
            <div className="p-6 bg-gray-100 border-b border-gray-400 rounded-b-lg border-x">
              <Pagination totalCount={data?.totalCount!} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
