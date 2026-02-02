import { AuthToastListener } from "@/components/modules/authentication/AuthToastListener";
import BannerSection from "@/components/modules/home/BannerSection";
import BrandPartners from "@/components/modules/home/BrandPartners";
import CategorySection from "@/components/modules/home/CategoriesSection";

export default function Home() {
  return (
    <div className="space-y-0 mt-8">
      <AuthToastListener />

      <BannerSection />
      <CategorySection />
      <BrandPartners />
    </div>
  );
}
