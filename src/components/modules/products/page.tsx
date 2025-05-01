"use client";

import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ui/core/ProductCard/ProductCard";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import type { IMeta } from "@/types";
import type { IProduct } from "@/types/product";
import { Filter } from "lucide-react";
import { useState } from "react";
import FilterSidebar from "./filterSidebar";
import ProductPagination from "./productPagination";

interface AllProductsProps {
  products: IProduct[];
  meta: IMeta;
}

const AllProducts = ({ products, meta }: AllProductsProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const shuffleArray = (array: unknown[]): unknown[] => {
    const newArray: unknown[] = [...array];
    for (let i: number = newArray.length - 1; i > 0; i--) {
      const j: number = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Mobile Filter Button */}
      <div className="flex justify-between items-center mb-4 md:hidden">
        <h2 className="text-xl font-semibold">Products</h2>
        <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Filter size={16} />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[350px] p-0">
            <div className="h-full overflow-y-auto">
              <FilterSidebar onFilterApplied={() => setIsFilterOpen(false)} />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Desktop Sidebar */}
        <div className="hidden md:block w-full md:w-[280px] lg:w-[320px] flex-shrink-0 sticky top-4 self-start">
          <FilterSidebar />
        </div>

        {/* Products Grid and Pagination */}
        <div className="flex-1">
          {products.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
                {(
                  shuffleArray(
                    products.flatMap((product) =>
                      Array(6)
                        .fill(null)
                        .map((_, i) => ({ ...product, uniqueKey: `${product._id}-${i}` }))
                    )
                  ) as (IProduct & { uniqueKey: string })[]
                ).map((product) => (
                  <ProductCard key={product.uniqueKey} product={product} />
                ))}
              </div>
              <div className="mt-8">
                <ProductPagination totalPage={meta?.totalPage} />
              </div>
            </>
          ) : (
            "product not found"
          )}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
