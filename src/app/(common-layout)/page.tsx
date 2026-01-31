import BannerSection from "@/components/modules/home/BannerSection";
import BrandPartners from "@/components/modules/home/BrandPartners";
import CategorySection from "@/components/modules/home/CategoriesSection";

export default async function Home() {
  return (
    <div className="space-y-0 mt-8">
      <BannerSection />
      <CategorySection />
      <BrandPartners />
    </div>
  );
}
