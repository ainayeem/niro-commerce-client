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
    <div className="bg-white bg-opacity-50 py-8 md:py-12 lg:py-16">
      <NCContainer>
        <div className="container mx-auto px-4 sm:px-6">
          {/* Header Section */}
          <div className="mb-8 sm:mb-10 lg:mb-12">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                <div className="text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                    <h2 className="font-bold text-2xl sm:text-3xl lg:text-4xl text-emerald-500 tracking-tight">Featured Products</h2>
                  </div>
                  <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-md">
                    Discover our exclusive collection of featured products.
                  </p>
                </div>
              </div>

              <Link href="/products" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="rounded-lg border-emerald-500/20 hover:bg-emerald-700 hover:text-secondary transition-all duration-300 w-full sm:w-auto"
                >
                  <span>Explore More</span>
                  <ChevronRightCircle className="w-4 h-4 sm:w-5 sm:h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {products.slice(0, 5).map((product: IProduct) => (
              <ProductCard key={product._id} product={product} className="hover:scale-[1.02] transition-transform duration-300" />
            ))}
          </div>
        </div>
      </NCContainer>
    </div>
  );
};

export default FeaturedProducts;
