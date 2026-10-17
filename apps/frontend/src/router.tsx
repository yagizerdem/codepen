import { createBrowserRouter } from "react-router";
import HomePage from "./pages/home-page";
import PrivacyTermsPage from "./pages/privacy-terms-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/privacy-terms",
    element: <PrivacyTermsPage />,
  },
]);

export default router;
