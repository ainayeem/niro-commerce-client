import { Button } from "@/components/ui/button";
import NCContainer from "@/components/ui/core/NCContainer/NCContainer";
import { Input } from "@/components/ui/input";
import styles from "./StayUpdate.module.css";

const StayUpdate = () => {
  return (
    <NCContainer>
      <div className={`${styles.banner} border-2 border-white rounded-3xl my-10`}>
        <div className="grid grid-cols-2 gap-4 items-center">
          <div className="pl-12 mt-24">
            <h1 className="text-5xl font-bold leading-normal text-white">Stay Update with Exclusive Offers!</h1>
            <p className="my-3 text-xl text-[#315104]">
              Save big this Black Friday with unbeatable deals on tech, home essentials, fashion, and more! Limited stock.
            </p>

            <div className="flex gap-3 mt-6">
              <Input placeholder="Enter Your Email" className="rounded-full"></Input>
              <Button className="rounded-full mr-2 border-2 border-white">Subscribe</Button>
            </div>
          </div>
          {/* <div className="flex items-center justify-center">
            <Image src={cupImage} alt="cup image" />
          </div> */}
        </div>
      </div>
    </NCContainer>
  );
};

export default StayUpdate;
