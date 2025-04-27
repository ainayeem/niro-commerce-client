import { Button } from "@/components/ui/button";
import NCContainer from "@/components/ui/core/NCContainer/NCContainer";
import { getAllBrands } from "@/services/BrandService";
import { IBrand } from "@/types";
import { ChevronRightCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const TopBrands = async () => {
  const { data: brands = [] } = await getAllBrands();

  return (
    <NCContainer className="my-36">
      <div className="mb-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            {/* <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-green-600 p-0.5 shadow-lg shadow-emerald-500/20">
                <div className="w-full h-full bg-white/90 rounded-xl flex items-center justify-center">
                  <AlarmClockCheck className="w-7 h-7 text-emerald-500" />
                </div>
              </div> */}
            <div className="text-center sm:text-left">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="font-bold text-3xl text-emerald-500 tracking-tight">Top Brands</h2>
              </div>
              <p className="text-muted-foreground text-sm md:text-base max-w-lg">Explore a wide range of popular brands to find your favorites.</p>
            </div>
          </div>

          <Link href="/products" className="group">
            <Button
              variant="outline"
              className="rounded-lg border-emerald-500/20 hover:bg-emerald-700 hover:text-secondary transition-all duration-300"
            >
              <span>All Collection</span>
              <ChevronRightCircle className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-6 my-10 ">
        {brands?.slice(0, 8)?.map((brand: IBrand) => (
          <div className="bg-white p-3 rounded-xl" key={brand._id}>
            <div className="bg-gray-100 p-2 rounded-md h-20 w-full">
              <Image src={brand?.logo} width={50} height={50} alt="category icon" className="mx-auto h-full w-full object-contain" />
            </div>
          </div>
        ))}
      </div>
    </NCContainer>
  );
};

export default TopBrands;
