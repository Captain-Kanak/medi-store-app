import BannerSection from "@/components/modules/home/BannerSection";
import BrandPartners from "@/components/modules/home/BrandPartners";

export default async function Home() {
  return (
    <div className="space-y-16 mt-8">
      <BannerSection />
      <BrandPartners />
    </div>
  );
}
