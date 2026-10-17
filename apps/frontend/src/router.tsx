import { createBrowserRouter } from "react-router";
import HomePage from "./pages/home-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage></HomePage>,
  },
]);

export default router;
