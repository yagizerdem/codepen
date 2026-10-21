import { AppFooter } from "@/components/app-footer";
import { HomeCta } from "@/components/home/home-cta";
import { HomeFeatures } from "@/components/home/home-features";
import { HomeHero } from "@/components/home/home-hero";
import { HomeStats } from "@/components/home/home-stats";
import { HomeSteps } from "@/components/home/home-steps";
import { AppLayout } from "@/layouts/app-layout";

export default function HomePage() {
  return (
    <AppLayout>
      <div className="min-h-0 flex-1 overflow-y-auto">
        <main className="flex w-full flex-col">
          <HomeHero />
          <HomeFeatures />
          <HomeSteps />
          <HomeStats />
          <HomeCta />
        </main>
        <AppFooter />
      </div>
    </AppLayout>
  );
}
