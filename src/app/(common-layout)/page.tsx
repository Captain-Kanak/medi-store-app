import { AuthToastListener } from "@/components/modules/authentication/AuthToastListener";
import BannerSection from "@/components/modules/home/BannerSection";
import BrandPartners from "@/components/modules/home/BrandPartners";
import { FeaturedCategories } from "@/components/modules/home/FeaturedCategories";

export default function Home() {
  return (
    <div className="space-y-0 mt-8">
      <AuthToastListener />

      <BannerSection />
      <FeaturedCategories />
      <BrandPartners />
    </div>
  );
}
