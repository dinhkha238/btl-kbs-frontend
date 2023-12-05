import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "./app-layout";
import App from "./App";
import { DieuLuat } from "./DieuLuat";

export const routers = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "",
        element: <App />,
      },
      {
        path: "tra-cuu-dieu-luat",
        element: <DieuLuat />,
      },
    ],
  },
]);
