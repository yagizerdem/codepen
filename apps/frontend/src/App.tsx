import { Button } from "@components/ui/button";
import { AppHeader } from "./components/app-header";
import Box from "./components/box";

function App() {
  return (
    <div className="flex flex-col w-screen h-screen overflow-y-hidden min-w-0">
      <AppHeader username="fucker" />
      <Box className="mt-20" />
    </div>
  );
}

export default App;
