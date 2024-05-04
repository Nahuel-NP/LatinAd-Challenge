import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

export const DeleteDialog = () => {
  const { showDeleteDialog, setShowDeleteDialog } = useContext(AppContext);

  const closeDialog = () => {
    setShowDeleteDialog(false);
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
          <p className="my-4">Está seguro que desea eliminar el elemento?</p>
          <div className="flex justify-between mt-8">
            <button className="px-4 py-2 text-white bg-red-500 rounded-lg">
              Eliminar
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
