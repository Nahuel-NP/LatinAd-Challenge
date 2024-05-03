import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

interface Props {
  totalCount: number;
}

export const Pagination = ({ totalCount }: Props) => {
  const { filters, setFilters } = useContext(AppContext);

  const lastPage = Math.ceil(totalCount / filters.perPage);

  const changePage = (page: number) => {
    setFilters({ ...filters, page });
  };

  return (
    <nav className="container flex justify-center gap-4 mx-auto ">
      <div>
        <ul className="flex items-center h-10 -space-x-px text-base [&>li>button]:transition-colors [&>li>button]:border [&>li>button]:bg-white [&>li>button]:border-dodger-blue-800  [&>li>span]:bg-white">
          <li>
            <button
              aria-label="anterior"
              disabled={filters.page === 1}
              onClick={() => changePage(filters.page - 1)}
              className="flex items-center justify-center h-10 px-4 disabled:pointer-events-none disabled:bg-gray-200 rounded-s-lg hover:bg-dodger-blue-600 hover:text-white "
            >
              <svg
                className="w-2.5 h-2.5 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
            </button>
          </li>

          {filters.page !== 1 && (
            <li>
              <button
                onClick={() => changePage(1)}
                className="flex items-center justify-center h-10 px-4 hover:bg-dodger-blue-600 hover:text-white "
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
            <button className="z-10 flex items-center justify-center h-10 px-4 text-white !bg-dodger-blue-800">
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
                className="z-10 flex items-center justify-center h-10 px-4 hover:bg-dodger-blue-600 hover:text-white"
              >
                {lastPage}
              </button>
            </li>
          )}

          <li>
            <button
              aria-label="siguiente"
              onClick={() => changePage(filters.page + 1)}
              disabled={filters.page === lastPage || lastPage === 0}
              className="flex items-center justify-center h-10 px-4 disabled:pointer-events-none disabled:bg-gray-200 rounded-e-lg hover:bg-dodger-blue-600 hover:text-white "
            >
              <svg
                className="w-2.5 h-2.5 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};
