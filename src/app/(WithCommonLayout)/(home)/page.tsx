import Category from "@/components/modules/home/Category";
import FeaturedProducts from "@/components/modules/home/FeaturedProducts";
import HeroSection from "@/components/modules/home/HeroSection";
import TrendyProductSection from "@/components/modules/home/TrendyProductSection";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <TrendyProductSection />
      <Category />
      <FeaturedProducts />
    </div>
  );
};

export default HomePage;
