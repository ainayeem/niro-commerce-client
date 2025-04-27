import { Button } from "@/components/ui/button";
import CategoryCard from "@/components/ui/core/CategoryCard/CategoryCard";
import NCContainer from "@/components/ui/core/NCContainer/NCContainer";
import { getAllCategories } from "@/services/CategoryService";
import { ICategory } from "@/types";
import { ChevronRightCircle } from "lucide-react";
import Link from "next/link";

const Category = async () => {
  const { data: categories = [] } = await getAllCategories();

  return (
    <NCContainer>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">Shop by Category</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Explore our wide range of products</p>
          </div>
          <Link href="/products" className="w-full sm:w-auto">
            <Button
              variant="outline"
              className="rounded-xl w-full sm:w-auto border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              View All Categories
            </Button>
          </Link>
        </div> */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <div className="text-center sm:text-left">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="font-bold text-3xl text-emerald-500 tracking-tight">Shop By Category</h2>
                  <div className="hidden sm:flex items-center"></div>
                </div>
                <p className="text-muted-foreground text-sm md:text-base max-w-md">Discover a variety of categories to find exactly what you need.</p>
              </div>
            </div>

            <Link href="/products" className="group">
              <Button
                variant="outline"
                className="rounded-lg border-emerald-500/20 hover:bg-emerald-700 hover:text-secondary transition-all duration-300"
              >
                <span>All Category</span>
                <ChevronRightCircle className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
          {categories.map((category: ICategory) => (
            <CategoryCard key={category._id} category={category} />
          ))}
        </div>
      </div>
    </NCContainer>
  );
};

export default Category;
