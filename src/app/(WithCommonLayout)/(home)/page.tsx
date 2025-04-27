import Category from "@/components/modules/home/Category";
import CTA from "@/components/modules/home/Cta";
import FeaturedProducts from "@/components/modules/home/FeaturedProducts";
import FlashSale from "@/components/modules/home/FlashSale";
import HeroSection from "@/components/modules/home/HeroSection";
import LatestProducts from "@/components/modules/home/LatestProducts";
import StayUpdate from "@/components/modules/home/StayUpdate";
import Testimonials from "@/components/modules/home/Testimonials";
import TopBrands from "@/components/modules/home/TopBrands";
import TrendyProductSection from "@/components/modules/home/TrendyProductSection";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <TrendyProductSection />
      <LatestProducts />
      <Category />
      <FeaturedProducts />
      <FlashSale />
      <TopBrands />
      <CTA />
      <Testimonials />
      <StayUpdate />
    </div>
  );
};

export default HomePage;
