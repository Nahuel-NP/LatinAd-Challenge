import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { Display } from "../../lib/interfaces";
import { AppContext } from "../../context/AppContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BASE_URL, QUERY_KEY } from "../../lib/contants";
import { toast } from "sonner";

export const EditDisplayForm = () => {
  const [formData, setFormData] = useState<Display>({
    id: 0,
    name: "",
    description: "",
    picture_url: "",
    price_per_day: "",
    resolution_height: "",
    resolution_width: "",
    type: "",
    user_id: 0,
  });

  const { activeDisplay, userCredentials, setActiveDisplay } =
    useContext(AppContext);

  useEffect(() => {
    setFormData(activeDisplay!);
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const queryClient = useQueryClient();

  const updateTodo = (display: Display) => {
    return fetch(`${BASE_URL}/display/${display.id}`, {
      method: "PUT",
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
    mutationFn: updateTodo,
    onError: (error) => {
      console.log(error)
      toast.error('Ocurrió un error al actualizar')
    },
    onSuccess: () => {
      toast.success("Display actualizado exitosamente", {
        position: "top-center",
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY, userCredentials.email],
      });
      setActiveDisplay(formData);
    },
  });

  const onSubmitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    createDisplayMutation.mutate({
      name: formData.name,
      description: formData.description,
      type: formData.type,
      price_per_day: formData.price_per_day,
      resolution_height: formData.resolution_height,
      resolution_width: formData.resolution_width,
      id: formData.id,
      picture_url: formData.picture_url,
      user_id: formData.user_id,
    });
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
          name="name"
          id="name"
          onChange={handleChange}
          value={formData?.name}
          placeholder="Nombre"
        />
      </div>
      <div>
        <label htmlFor="description">Descripción</label>
        <textarea
          required
          name="description"
          onChange={handleChange}
          value={formData?.description}
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
          onChange={handleChange}
          value={formData?.price_per_day}
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
              onChange={handleChange}
              value={formData?.resolution_width}
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
              onChange={handleChange}
              value={formData?.resolution_height}
              placeholder="Alto"
              className="p-2 rounded-md"
            />
          </div>
        </div>
      </fieldset>
      <fieldset title="tipo" className="grid grid-cols-2 ">
        <legend>Tipo</legend>
        <div className="flex items-center justify-center gap-1">
          <input
            required
            type="radio"
            id="indoor"
            name="type"
            value="indoor"
            checked={formData.type === "indoor"}
            onChange={handleChange}
          />
          <label htmlFor="indoor">indoor</label>
        </div>
        <div className="flex items-center justify-center gap-1">
          <input
            required
            type="radio"
            id="outdoor"
            name="type"
            value="outdoor"
            checked={formData.type === "outdoor"}
            onChange={handleChange}
          />
          <label htmlFor="outdoor">outdoor</label>
        </div>
      </fieldset>
      <button
        type="submit"
        disabled={createDisplayMutation.isPending}
        className="self-center p-2 mt-4 text-white transition-colors bg-orange-500 rounded-md hover:bg-orange-700 min-w-36 disabled:pointer-events-none disabled:bg-gray-500"
      >
        {createDisplayMutation.isPending ? "Actualizando..." : "Actualizar"}
      </button>
    </form>
  );
};
