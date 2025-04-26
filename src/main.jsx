import "./index.css";
import App from "./App.jsx";
import { StrictMode } from "react";
import { Dashboard, Home, SubmitForm } from "./pages/index.js";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/submit",
        element: <SubmitForm />,
      },

      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
    <App />
  </StrictMode>
);
