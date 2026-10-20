import { RouterProvider } from "react-router";
import router from "@/router";
import { Fragment } from "react/jsx-runtime";
import { Toaster } from "@/components/ui/toast";

function App() {
  return (
    <Fragment>
      <RouterProvider router={router} />
      <Toaster />
    </Fragment>
  );
}

export default App;
