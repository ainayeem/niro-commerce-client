import drone from "@/assets/drone.png";
import headphone from "@/assets/headphone.png";
import headphone2 from "@/assets/headphone2.png";
import vr from "@/assets/vr.png";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import styles from "./TrendyProductSection.module.css";

const trendyProducts = [
  {
    id: 1,
    name: "Logitech Gaming Headphone",
    price: 150.99,
    originalPrice: 175.99,
    image: headphone2,
  },
  {
    id: 2,
    name: "Fantech Headphone",
    price: 150.99,
    originalPrice: 175.99,
    image: vr,
  },
  {
    id: 3,
    name: "Premium Headset",
    price: 150.99,
    originalPrice: 175.99,
    image: drone,
  },
];

const TrendyProductSection = () => {
  return (
    <div className={`container mx-auto mt-10 grid grid-cols-4 gap-8`}>
      {/* card */}
      <div className="flex flex-col items-center border-2 border-white rounded-3xl bg-[#f8f8f8]">
        <Image className="rounded-t-2xl" src={headphone} width={300} height={300} alt="image" />
        <div className={`${styles.bgViolate} space-y-6 w-full rounded-2xl flex flex-col items-center pb-6`}>
          <h1 className="font-bold text-2xl text-center">Trendy Products</h1>
          <Button className="rounded-full w-3/4 self-auto">Buy Now</Button>
        </div>
      </div>

      {trendyProducts.map((product) => (
        <div key={product.id} className="flex flex-col items-center border-2 border-white rounded-3xl bg-[#f8f8f8]">
          <Image className="rounded-t-2xl" src={product.image} width={300} height={300} alt="image" />
          <div className={`${styles.bgViolate} space-y-6 w-full rounded-2xl flex flex-col items-center pb-6 h-full`}>
            <h1 className="font-bold text-2xl text-center">{product.name}</h1>
            <h1 className="font-bold text-2xl text-center">
              $ {product.price} <span className="line-through text-gray-500 text-xl">{product.originalPrice}</span>
            </h1>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrendyProductSection;
