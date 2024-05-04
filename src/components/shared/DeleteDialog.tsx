import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BASE_URL, QUERY_KEY } from "../../lib/contants";
import { toast } from "sonner";

export const DeleteDialog = () => {
  const {
    showDeleteDialog,
    setShowDeleteDialog,
    userCredentials,
    activeDisplay,
    setActiveDisplay,
  } = useContext(AppContext);

  const closeDialog = () => {
    setActiveDisplay(null);
    setShowDeleteDialog(false);
  };

  const queryClient = useQueryClient();

  const deleteDisplay = (id: number) => {
    return fetch(`${BASE_URL}/display/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userCredentials.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteDisplayMutation = useMutation({
    mutationFn: deleteDisplay,
    onError: (error) => window.alert(error),
    onSuccess: () => {
      setShowDeleteDialog(false);
      toast.success("Display eliminado exitosamente", {
        position: "top-center",
      });
      setActiveDisplay(null);
      queryClient.invalidateQueries({
        queryKey: [
          QUERY_KEY
        ],
      });
    },
  });

  const confirmDelete = () => {
    deleteDisplayMutation.mutate(activeDisplay?.id!);
  };

  return (
    <dialog
      id="modal"
      className="fixed inset-0 z-[100] w-full h-full bg-gray-900 bg-opacity-30"
      open={showDeleteDialog}
    >
      <section className="grid w-full h-full place-items-center">
        <div className="p-8 bg-white rounded-md">
          <h3 className="text-xl font-semibold">Desea eliminar?</h3>
          <p className="my-4">
            Está seguro que desea eliminar{" "}
            <span className="font-semibold text-orange-500">
              {" "}
              {activeDisplay?.name}
            </span>
            ?
          </p>
          <div className="flex justify-between mt-8">
            <button
              onClick={confirmDelete}
              disabled={deleteDisplayMutation.isPending}
              className="px-4 py-2 text-white bg-red-500 rounded-lg disabled:pointer-events-none disabled:bg-gray-500"
            >
              {deleteDisplayMutation.isPending ? "Eliminando" : "Eliminar"}
            </button>
            <button
              onClick={closeDialog}
              className="px-4 py-2 text-white bg-blue-500 rounded-lg"
            >
              Cancelar
            </button>
          </div>
        </div>
      </section>
    </dialog>
  );
};
