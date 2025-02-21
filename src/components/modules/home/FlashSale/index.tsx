import { Button } from "@/components/ui/button";
import NCContainer from "@/components/ui/core/NCContainer/NCContainer";
import ProductCard from "@/components/ui/core/ProductCard/ProductCard";
import { getFlashSaleProducts } from "@/services/FlashSale";
import { IProduct } from "@/types";
import Link from "next/link";
import CountDown from "./CountDown";

const FlashSale = async () => {
  const { data: products } = await getFlashSaleProducts();

  return (
    <div className=" bg-white bg-opacity-50 pt-6 pb-8">
      <NCContainer className="my-16">
        <div className="flex items-center justify-between ">
          <div className="flex items-center gap-8">
            <h2 className="text-3xl font-bold">Flash Deals</h2>
            <CountDown />
          </div>

          <Link href="/products">
            <Button variant="outline" className="rounded-full">
              All Collection
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-4 gap-4 mt-10">
          {products?.slice(0, 4)?.map((product: IProduct, idx: number) => (
            <ProductCard key={idx} product={product} />
          ))}
        </div>
      </NCContainer>
    </div>
  );
};

export default FlashSale;
