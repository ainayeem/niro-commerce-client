import { Button } from "@/components/ui/button";
import NCContainer from "@/components/ui/core/NCContainer/NCContainer";
import styles from "./HeroSection.module.css";

const HeroSection = () => {
  return (
    <NCContainer>
      <div className={`${styles.banner} border-2 border-white rounded-3xl mt-4 md:mt-10`}>
        {/* Content wrapper with relative positioning */}
        <div className="relative z-10 h-full flex items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center h-full w-full">
            <div className="px-6 md:pl-12 pt-8 md:pt-16 pb-8 text-center md:text-left">
              <p className="text-xl sm:text-2xl md:text-3xl font-bold leading-normal text-white drop-shadow-lg">
                Don&apos;t Miss Out on These Unbeatable
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white md:-ml-1 drop-shadow-lg">Black Friday Deals!</h1>
              <p className="my-3 text-base sm:text-lg text-white/90 max-w-lg mx-auto md:mx-0 drop-shadow">
                Save big this Black Friday with unbeatable deals on tech, home essentials, fashion, and more! Limited stock.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <Button className="rounded-full border-2 border-white w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-sm">
                  Buy Now
                </Button>
                <Button className="rounded-full w-full sm:w-auto bg-white text-emerald-800 hover:bg-white/90" variant="outline">
                  All Products
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NCContainer>
  );
};

export default HeroSection;
