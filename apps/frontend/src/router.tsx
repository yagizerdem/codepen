import { createBrowserRouter } from "react-router";
import HomePage from "@pages/home-page";
import PrivacyTermsPage from "@pages/privacy-terms-page";
import NewPenPage from "@pages/new-pen-page";
import SupportPage from "@pages/support-page";
import DocumentationPage from "@pages/documentation-page";

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
  {
    path: "/documentation",
    element: <DocumentationPage />,
  },
]);

export default router;
