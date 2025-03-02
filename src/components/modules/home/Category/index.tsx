import { Button } from "@/components/ui/button";
import CategoryCard from "@/components/ui/core/CategoryCard/CategoryCard";
import NCContainer from "@/components/ui/core/NCContainer/NCContainer";
import { getAllCategories } from "@/services/CategoryService";
import { ICategory } from "@/types";
import Link from "next/link";

const Category = async () => {
  const { data: categories = [] } = await getAllCategories();
  return (
    <NCContainer>
      <div className="container mx-auto my-20">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-2xl">Category</h2>
          <Link href="/products">
            <Button variant="outline" className="rounded-full">
              View All
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-6 gap-8 my-5">
          {categories.map((category: ICategory) => (
            <CategoryCard key={category._id} category={category} />
          ))}
        </div>
      </div>
    </NCContainer>
  );
};

export default Category;
