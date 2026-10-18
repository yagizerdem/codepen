import { createBrowserRouter } from "react-router";
import HomePage from "@pages/home-page";
import PrivacyTermsPage from "@pages/privacy-terms-page";
import NewPenPage from "@pages/new-pen";
import SupportPage from "@pages/support-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/privacy-terms",
    element: <PrivacyTermsPage />,
  },
  {
    path: "/support",
    element: <SupportPage />,
  },
  {
    path: "/new-pen",
    element: <NewPenPage />,
  },
]);

export default router;
