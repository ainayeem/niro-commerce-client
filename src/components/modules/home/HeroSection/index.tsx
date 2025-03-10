import { Button } from "@/components/ui/button";
import NCContainer from "@/components/ui/core/NCContainer/NCContainer";
import styles from "./HeroSection.module.css";

const HeroSection = () => {
  return (
    <NCContainer>
      <div className={`${styles.banner} border-2 border-white rounded-3xl mt-10`}>
        <div className="grid grid-cols-2 gap-4 items-center">
          <div className="pl-12 pt-16">
            <h1 className="text-5xl font-bold leading-normal text-white">
              Don&apos;t Miss Out on <br /> These Unbeatable Black <br /> Friday Deals!
            </h1>
            <p className="my-3 text-xl text-[#315104]">
              Save big this Black Friday with unbeatable deals on tech, home essentials, fashion, and more! Limited stock.
            </p>

            <Button className="rounded-full mr-2 border-2 border-white">Buy Now</Button>
            <Button className="rounded-full" variant="outline">
              All Products
            </Button>
          </div>
          {/* <div className="flex items-center justify-center">
            <Image src={cupImage} alt="cup image" />
          </div> */}
        </div>
      </div>
    </NCContainer>
  );
};

export default HeroSection;
