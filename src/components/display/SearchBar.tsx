import { ChangeEvent, FormEvent, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { PER_PAGE_VALUES } from "../../lib/contants";

export const SearchBar = () => {
  const { setFilters, filters } = useContext(AppContext);

  const onTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilters({ ...filters, type: e.target.value });
  };

  const search = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { searchTerm } = event.target as HTMLFormElement;
    setFilters({ ...filters, name: searchTerm.value });
  };

  const onSizeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilters({ ...filters, perPage: +e.target.value, page: 1 });
  };

  return (
    <section className="container grid grid-cols-2 gap-2 p-4 rounded-t-lg md:grid-cols-4 md:p-6 md:gap-4">
      <form className="flex flex-1 w-full col-span-2" onSubmit={search}>
        <label className="sr-only" htmlFor="searchTerm">
          Buscar:
        </label>
        <input
          type="text"
          id="searchTerm"
          placeholder="Buscar"
          name="searchTerm"
          className="flex-1 w-full px-4 py-2 bg-white rounded-s-md"
        />
        <button
          className="px-4 py-2 text-white bg-latinBlue rounded-e-md min-w-24"
          type="submit"
        >
          Buscar
        </button>
      </form>
      <div className="flex items-center gap-2 justify-self-end">
        <label htmlFor="type">Tipo:</label>
        <select
          id="type"
          onChange={onTypeChange}
          className="px-4 py-2 bg-white rounded-md min-w-28"
          name="type"
        >
          <option value="">Todas</option>
          <option value="indoor">Indoor</option>
          <option value="outdoor">Outdoor</option>
        </select>
      </div>

      <div className="flex items-center gap-2 justify-self-end">
        <label htmlFor="perPage">Por página:</label>
        <select
          id="perPage"
          onChange={onSizeChange}
          className="px-4 py-2 bg-white rounded-md "
          name="perPage"
          value={filters.perPage}
        >
          {PER_PAGE_VALUES.map((value, i) => (
            <option key={value.toString() + i} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
};
