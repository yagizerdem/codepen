import { AppFooter } from "@/components/app-footer";
import { AppLayout } from "@/layouts/app-layout";

export default function HomePage() {
  return (
    <AppLayout>
      <div className="flex-1 min-h-0 bg-red-500 overflow-y-auto">
        Home Page
        <div className="h-[2000px]"></div>
        <AppFooter />
      </div>
    </AppLayout>
  );
}
