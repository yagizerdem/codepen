import { createBrowserRouter } from "react-router";
import HomePage from "@pages/home-page";
import PrivacyTermsPage from "@pages/privacy-terms-page";
import NewPenPage from "@pages/new-pen-page";
import SupportPage from "@pages/support-page";
import DocumentationPage from "@pages/documentation-page";
import BlogPage from "@pages/blog-page";
import MyPensPage from "@pages/my-pens-page";
import ReadPage from "@pages/read-page";
import ExplorePage from "@pages/explore-page";
import RegisterPage from "@pages/register-page";
import LoginPage from "./pages/login-page";
import WriteBlogPage from "./pages/write-blog";

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
  {
    path: "/blog",
    element: <BlogPage />,
  },
  {
    path: "/my-pens",
    element: <MyPensPage />,
  },
  {
    path: "/explore",
    element: <ExplorePage />,
  },
  {
    path: "/read/:blogid",
    element: <ReadPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/write-blog",
    element: <WriteBlogPage />,
  },
]);

export default router;
