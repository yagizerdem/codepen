import { AppHeader } from "@/components/app-header";
import Box from "@/components/box";

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col w-screen h-screen overflow-y-hidden min-w-0">
      <AppHeader username="fucker" />
      <Box className="mt-20" />
      <div className="flex flex-col flex-1 min-h-0 w-full">{children}</div>
    </div>
  );
}
