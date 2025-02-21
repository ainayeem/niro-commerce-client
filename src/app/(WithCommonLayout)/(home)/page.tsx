import Category from "@/components/modules/home/Category";
import FeaturedProducts from "@/components/modules/home/FeaturedProducts";
import FlashSale from "@/components/modules/home/FlashSale";
import HeroSection from "@/components/modules/home/HeroSection";
import StayUpdate from "@/components/modules/home/StayUpdate";
import TopBrands from "@/components/modules/home/TopBrands";
import TrendyProductSection from "@/components/modules/home/TrendyProductSection";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <TrendyProductSection />
      <Category />
      <FeaturedProducts />
      <FlashSale />
      <TopBrands />
      <StayUpdate />
    </div>
  );
};

export default HomePage;
