import HomePage from "@/pages";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

export default function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "*",
      element: <div>404 page not found</div>,
    },
  ]);

  return <RouterProvider router={router} />;
}
