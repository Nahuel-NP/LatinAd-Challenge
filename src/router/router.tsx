import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "../layouts/AppLayout";
import { LoginPage } from "../pages/LoginPage";
import { Displays } from "../pages/Displays";
import { EditDisplay } from "../pages/EditDisplay";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index:true,
        element: <Displays />,
      },
      {
        path: "display/:name",
        element: <EditDisplay />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  //TODO: 404
]);
