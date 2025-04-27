import { Button } from "@/components/ui/button";
import NCContainer from "@/components/ui/core/NCContainer/NCContainer";
import ProductCard from "@/components/ui/core/ProductCard/ProductCard";
import { getAllProducts } from "@/services/ProductService";
import type { IProduct } from "@/types";
import { Bell, ChevronRightCircle, Star } from "lucide-react";
import Link from "next/link";

const LatestProducts = async () => {
  const { data: products } = await getAllProducts(undefined, undefined, {
    sort: "-createdAt",
  });

  return (
    <NCContainer className="py-20 w-full bg-gradient-to-b from-background via-emerald-50/30 to-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 left-1/4 w-64 h-64 bg-emerald-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-green-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-emerald-100/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container relative z-10">
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
                  <h2 className="font-bold text-3xl text-emerald-500 tracking-tight">Latest Products</h2>
                  <div className="hidden sm:flex items-center">
                    <div className="relative animate-bounce">
                      <Bell className="w-5 h-5 text-emerald-500 fill-emerald-200" />
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm md:text-base max-w-md">Discover our newest arrivals and trending items</p>
              </div>
            </div>

            <Link href="/products" className="group">
              <Button
                variant="outline"
                className="rounded-lg border-emerald-500/20 hover:bg-emerald-700 hover:text-secondary transition-all duration-300"
              >
                <span>All Products</span>
                <ChevronRightCircle className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="relative">
          {/* Product grid with enhanced styling */}
          <div className="rounded-2xl p-1">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 sm:gap-6">
              {products?.map((product: IProduct) => (
                <div key={product._id} className="group relative">
                  <div className="absolute -inset-1 bg-gradient-to-br from-emerald-100 to-green-100 rounded-xl opacity-0 group-hover:opacity-70 transition-opacity duration-300 -z-10 blur-xl"></div>
                  <ProductCard key={product._id} product={product} />
                  {products.indexOf(product) < 10 && (
                    <div className="absolute -top-3 -right-1 bg-gradient-to-r from-emerald-500 to-green-500 text-white text-xs font-medium px-2 py-1 rounded-full shadow-md">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-white" />
                        <span>New</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </NCContainer>
  );
};

export default LatestProducts;
