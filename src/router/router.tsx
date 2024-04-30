import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { Displays } from "../pages/DisplaysPage";
import { EditDisplay } from "../pages/EditDisplayPage";
import { LoginLayout, PrivateLayout } from "../layouts";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateLayout />,
    children: [
      {
        index: true,
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
    element: <LoginLayout />,
    children:[
      {
        index:true,
        element: <LoginPage/>
      }
    ]
  },
  //TODO: 404
]);
