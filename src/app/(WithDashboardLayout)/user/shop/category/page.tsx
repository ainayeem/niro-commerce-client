import ManageCategories from "@/components/modules/shop/category";
import { getAllCategories } from "@/services/CategoryService";

const ProductCategoryPage = async () => {
  const { data, meta } = await getAllCategories();
  return (
    <div>
      <ManageCategories categories={data} meta={meta} />
    </div>
  );
};

export default ProductCategoryPage;
