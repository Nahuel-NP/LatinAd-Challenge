import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormEvent, useContext } from "react";
import { BASE_URL, QUERY_KEY } from "../../lib/contants";
import { AppContext } from "../../context/AppContext";
import { toast } from "sonner";

interface DisplayToCreate {
  name: string;
  description: string;
  price_per_day: string;
  resolution_height: string;
  resolution_width: string;
  type: string;
}

export const CreateDisplayForm = () => {
  const { userCredentials } = useContext(AppContext);
  const queryClient = useQueryClient();

  const createTodo = (display: DisplayToCreate) => {
    return fetch(`${BASE_URL}/display`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userCredentials.token}`,
      },
      body: JSON.stringify(display),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const createDisplayMutation = useMutation({
    mutationFn: createTodo,
    onError: (error) => {
      console.log(error);
      toast.error("Ocurrió un error al actualizar");
    },
    onSuccess: () => {
      toast.success("Display creado exitosamente", {
        position: "top-center",
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY],
      });
    },
  });

  const onSubmitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const {
      display_name,
      description,
      resolution_width,
      resolution_height,
      type,
      price_per_day,
    } = event.target as HTMLFormElement;

    createDisplayMutation.mutate({
      name: display_name.value,
      description: description.value,
      type: type.value,
      price_per_day: price_per_day.value,
      resolution_height: resolution_height.value,
      resolution_width: resolution_width.value,
    });

    form.reset();
  };

  return (
    <form
      onSubmit={onSubmitForm}
      className="flex flex-col max-w-sm mx-auto w-full gap-4 [&>div]:flex [&>div]:flex-col bg-gray-300 p-4 rounded-lg"
    >
      <div>
        <label htmlFor="name">Nombre</label>
        <input
          className="p-2 rounded-md"
          required
          type="text"
          name="display_name"
          id="name"
          placeholder="Nombre"
        />
      </div>
      <div>
        <label htmlFor="description">Descripción</label>
        <textarea
          required
          name="description"
          className="p-2 rounded-md"
          placeholder="Descripción del display"
        />
      </div>
      <div>
        <label htmlFor="price_per_day">Precio por día</label>
        <input
          className="p-2 rounded-md "
          required
          type="number"
          min="1"
          name="price_per_day"
          id="price_per_day"
          placeholder="Precio por día"
        />
      </div>
      <fieldset title="Resolucition ">
        <legend>Resolución</legend>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="ancho">Ancho</label>
            <input
              required
              type="number"
              id="ancho"
              name="resolution_width"
              min={1}
              placeholder="Ancho"
              className="p-2 rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="alto">Alto</label>
            <input
              required
              type="number"
              id="alto"
              name="resolution_height"
              min={1}
              placeholder="Alto"
              className="p-2 rounded-md"
            />
          </div>
        </div>
      </fieldset>
      <fieldset title="tipo" className="grid grid-cols-2 ">
        <legend>Tipo</legend>
        <div className="flex items-center justify-center gap-1">
          <input required type="radio" id="indoor" name="type" value="indoor" />
          <label htmlFor="indoor">indoor</label>
        </div>
        <div className="flex items-center justify-center gap-1">
          <input
            required
            type="radio"
            id="outdoor"
            name="type"
            value="outdoor"
          />
          <label htmlFor="outdoor">outdoor</label>
        </div>
      </fieldset>
      <button
        type="submit"
        disabled={createDisplayMutation.isPending}
        className="self-center p-2 mt-4 text-white rounded-md min-w-36 disabled:pointer-events-none disabled:bg-gray-500 bg-dodger-blue-700"
      >
        {createDisplayMutation.isPending ? "Creando..." : "Crear"}
      </button>
    </form>
  );
};
