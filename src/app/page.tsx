import { HeroSection } from "@/components/HeroSection";
import { StatsBar } from "@/components/StatsBar";
import { LocationGrid } from "@/components/LocationGrid";
import { StorySection } from "@/components/StorySection";
import { MenuSection } from "@/components/MenuSection";
import { ReelsSection } from "@/components/ReelsSection";
import { Footer } from "@/components/Footer";

/** Colombian tricolor divider — placed between every major section transition */
function ColDivider() {
  return (
    <div aria-hidden="true" className="flex h-1 w-full">
      <div className="flex-1 bg-amarillo" />
      <div className="flex-1 bg-rojo" />
      <div className="flex-1 bg-azul" />
    </div>
  );
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <ColDivider />
      <LocationGrid />
      <ColDivider />
      <StorySection />
      <ColDivider />
      <MenuSection />
      <ColDivider />
      <ReelsSection />
      <Footer />
    </>
  );
}
