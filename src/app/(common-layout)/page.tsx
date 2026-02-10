import { AuthToastListener } from "@/components/modules/authentication/AuthToastListener";
import BannerSection from "@/components/modules/home/BannerSection";
import { FeaturedCategories } from "@/components/modules/home/FeaturedCategories";
import { FeaturedMedicines } from "@/components/modules/home/FeaturedMedicines";
import { TrustSection } from "@/components/modules/home/TrustSection";

export default function Home() {
  return (
    <div className="space-y-0 mt-8">
      <AuthToastListener />

      <BannerSection />
      <FeaturedCategories />
      <FeaturedMedicines />
      <TrustSection />
    </div>
  );
}
