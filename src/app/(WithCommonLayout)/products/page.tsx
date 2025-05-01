import ProductBanner from "@/components/modules/products/banner";
import Category from "@/components/modules/products/category";
import AllProducts from "@/components/modules/products/page";
import NCContainer from "@/components/ui/core/NCContainer/NCContainer";
import { getAllCategories } from "@/services/CategoryService";
import { getAllProducts } from "@/services/ProductService";

type TSearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const AllProductsPage = async ({ searchParams }: { searchParams: TSearchParams }) => {
  const query = await searchParams;
  const { data: categories } = await getAllCategories();
  const { data: products, meta } = await getAllProducts(undefined, "10", query);

  return (
    <NCContainer>
      <ProductBanner title="All Products" path="Home - Products" />

      {/* <div className="mb-8 md:mb-12">
        <h2 className="text-2xl md:text-3xl font-bold my-6 md:my-8 text-center md:text-left">Featured Collections</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
          {categories?.slice(0, 6).map((category: ICategory, idx: number) => (
            <div key={idx} className="w-full">
              <CategoryCard category={category} />
            </div>
          ))}
        </div>
      </div> */}
      <Category categories={categories} />
      <AllProducts products={products} meta={meta} />
    </NCContainer>
  );
};

export default AllProductsPage;
