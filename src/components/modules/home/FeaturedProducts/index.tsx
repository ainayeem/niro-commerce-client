import { Button } from "@/components/ui/button";
import NCContainer from "@/components/ui/core/NCContainer/NCContainer";
import ProductCard from "@/components/ui/core/ProductCard/ProductCard";
import { getAllProducts } from "@/services/ProductService";
import { IProduct } from "@/types";
import Link from "next/link";

const FeaturedProducts = async () => {
  const { data: products = [] } = await getAllProducts();

  return (
    <div className="bg-white bg-opacity-50 py-10">
      <NCContainer>
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-2xl">Featured Products</h2>
            <Link href="/products">
              <Button variant="outline" className="rounded-full">
                All Collection
              </Button>
            </Link>
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
