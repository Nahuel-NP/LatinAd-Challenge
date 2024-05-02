import { ChangeEvent, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { PER_PAGE_VALUES } from "../../lib/contants";

interface Props {
  totalCount: number;
}

export const Pagination = ({ totalCount }: Props) => {
  const { filters, setFilters } = useContext(AppContext);

  const lastPage = Math.ceil(totalCount / filters.perPage);

  const changePage = (page: number) => {
    setFilters({ ...filters, page });
  };

  const onSizeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilters({ ...filters, perPage: +e.target.value, page: 1 });
  };

  return (
    <nav className="container flex justify-center gap-4 mx-auto ">
      <div>
        <ul className="flex items-center h-10 -space-x-px text-base [&>li>button]:transition-colors [&>li>button]:border [&>li>button]:bg-white [&>li>button]:border-gray-300  [&>li>span]:bg-white">
          <li>
            <button
              disabled={filters.page === 1}
              onClick={() => changePage(filters.page - 1)}
              className="flex items-center justify-center h-10 px-4 disabled:pointer-events-none disabled:bg-gray-200 rounded-s-lg hover:bg-latinBlue hover:text-white "
            >
              Anterior
            </button>
          </li>

          {filters.page !== 1 && (
            <li>
              <button
                onClick={() => changePage(1)}
                className="flex items-center justify-center h-10 px-4 hover:bg-latinBlue hover:text-white "
              >
                1
              </button>
            </li>
          )}
          {filters.page > 2 && (
            <li>
              <span className="flex items-center justify-center h-10 px-4 ">
                ...
              </span>
            </li>
          )}

          <li>
            <button className="z-10 flex items-center justify-center h-10 px-4 text-white !bg-latinBlue">
              {filters.page}
            </button>
          </li>
          {filters.page < lastPage - 1 && (
            <li>
              <span className="flex items-center justify-center h-10 px-4 ">
                ...
              </span>
            </li>
          )}

          {filters.page !== lastPage && lastPage !== 0 && (
            <li>
              <button
                onClick={() => changePage(lastPage)}
                className="z-10 flex items-center justify-center h-10 px-4 hover:bg-latinBlue hover:text-white"
              >
                {lastPage}
              </button>
            </li>
          )}

          <li>
            <button
              onClick={() => changePage(filters.page + 1)}
              disabled={filters.page === lastPage || lastPage === 0}
              className="flex items-center justify-center h-10 px-4 disabled:pointer-events-none disabled:bg-gray-200 rounded-e-lg hover:bg-latinBlue hover:text-white "
            >
              Siguiente
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};
