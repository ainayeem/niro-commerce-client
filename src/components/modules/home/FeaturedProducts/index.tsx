import { Button } from "@/components/ui/button";
import NCContainer from "@/components/ui/core/NCContainer/NCContainer";
import ProductCard from "@/components/ui/core/ProductCard/ProductCard";
import { getAllProducts } from "@/services/ProductService";
import { IProduct } from "@/types";
import { ChevronRightCircle } from "lucide-react";
import Link from "next/link";

const FeaturedProducts = async () => {
  const { data: products = [] } = await getAllProducts();

  return (
    <div className="bg-white bg-opacity-50 py-10">
      <NCContainer>
        <div className="container mx-auto">
          {/* <div className="flex items-center justify-between">
            <h2 className="font-bold text-2xl">Featured Products</h2>
            <Link href="/products">
              <Button variant="outline" className="rounded-full">
                All Collection
              </Button>
            </Link>
          </div> */}
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
                    <h2 className="font-bold text-3xl text-emerald-500 tracking-tight">Featured Products</h2>
                  </div>
                  <p className="text-muted-foreground text-sm md:text-base max-w-md">Discover our exclusive collection of featured products.</p>
                </div>
              </div>

              <Link href="/products" className="group">
                <Button
                  variant="outline"
                  className="rounded-lg border-emerald-500/20 hover:bg-emerald-700 hover:text-secondary transition-all duration-300"
                >
                  <span>Explore More</span>
                  <ChevronRightCircle className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-8 my-5">
            {products.slice(0, 5).map((product: IProduct) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </NCContainer>
    </div>
  );
};

export default FeaturedProducts;
