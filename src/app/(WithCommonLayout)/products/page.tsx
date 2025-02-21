import ProductBanner from "@/components/modules/products/banner";
import AllProducts from "@/components/modules/products/page";
import CategoryCard from "@/components/ui/core/CategoryCard/CategoryCard";
import NCContainer from "@/components/ui/core/NCContainer/NCContainer";
import { getAllCategories } from "@/services/CategoryService";
import { getAllProducts } from "@/services/ProductService";
import { ICategory } from "@/types";

const AllProductsPage = async () => {
  const { data: categories } = await getAllCategories();
  const { data: products } = await getAllProducts();

  return (
    <NCContainer>
      <ProductBanner title="All Products" path="Home - Products" />
      <h2 className="text-xl font-bold my-5">Featured Collection </h2>
      <div className="grid grid-cols-6 gap-6">
        {categories?.slice(0, 6).map((category: ICategory, idx: number) => (
          <CategoryCard key={idx} category={category} />
        ))}
      </div>
      <AllProducts products={products} />
    </NCContainer>
  );
};

export default AllProductsPage;
