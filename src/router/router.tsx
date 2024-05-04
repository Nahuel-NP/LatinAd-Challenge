import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { Displays } from "../pages/DisplaysPage";
import { DetailsDisplayPage } from "../pages/DetailsDisplayPage";
import { LoginLayout, PrivateLayout } from "../layouts";
import { NotFoundPage } from "../pages/NotFoundPage";

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
        path: "display/:id",
        element: <DetailsDisplayPage />,
      },
    ],
  },
  {
    path: "/log-in",
    element: <LoginLayout />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
    ],
  },
  {
    path: "*",
    element:<NotFoundPage/>
  },
]);
