import * as React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { TowerDefence } from "./app";

const router = createBrowserRouter([
  {
    path: "/",
    element: <TowerDefence />,
  },
]);

const rootNode = document.getElementById("root");

if (rootNode) {
  createRoot(rootNode).render(<RouterProvider router={router} />);
}
