import { ChangeEvent, FormEvent, useContext, useRef } from "react";
import { AppContext } from "../../context/AppContext";
import { PER_PAGE_VALUES } from "../../lib/contants";

export const SearchBar = () => {
  const { setFilters, filters } = useContext(AppContext);
  const formRef = useRef<HTMLFormElement>(null);

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

  const clearName = () => {
    setFilters({ ...filters, name: "" });
    formRef.current?.reset();
  };

  return (
    <section className="container grid gap-2 p-4 rounded-t-lg lg:grid-cols-2 justify-items-center md:p-6 md:gap-4">
      <form className="flex w-full " onSubmit={search} ref={formRef}>
        <label className="sr-only" htmlFor="searchTerm">
          Buscar:
        </label>
        <input
          type="text"
          id="searchTerm"
          placeholder="Buscar"
          name="searchTerm"
          className="flex-1 w-full px-4 py-2 bg-white border border-dodger-blue-800 rounded-s-md"
        />
        <button
          className="px-4 py-2 font-semibold text-white bg-dodger-blue-800 rounded-e-md min-w-24"
          type="submit"
        >
          Buscar
        </button>
        {filters.name && (
          <button
            onClick={clearName}
            className="px-4 py-2 ml-2 font-semibold text-white bg-red-600 rounded-md min-w-24"
            type="submit"
          >
            Limpiar
          </button>
        )}
      </form>
      <div className="flex flex-wrap items-center gap-2 justify-self-end">
        <label htmlFor="type" className="flex items-center gap-2">
          Tipo:
          <select
            id="type"
            onChange={onTypeChange}
            className="px-4 py-2 text-center bg-white border rounded-md appearance-none min-w-28 border-dodger-blue-800"
            name="type"
          >
            <option value="">Todas</option>
            <option value="indoor">Indoor</option>
            <option value="outdoor">Outdoor</option>
          </select>
        </label>

        <label htmlFor="perPage" className="flex items-center gap-2">
          Por página:
          <select
            id="perPage"
            onChange={onSizeChange}
            className="px-4 py-2 text-center bg-white border rounded-md appearance-none border-dodger-blue-800"
            name="perPage"
            value={filters.perPage}
          >
            {PER_PAGE_VALUES.map((value, i) => (
              <option key={value.toString() + i} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>
      </div>
    </section>
  );
};
