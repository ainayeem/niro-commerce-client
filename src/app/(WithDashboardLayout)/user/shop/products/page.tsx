import ManageProducts from "@/components/modules/shop/product";
import { getAllProducts } from "@/services/ProductService";

const ManageProductsPage = async () => {
  const { data, meta } = await getAllProducts();
  return (
    <div>
      <ManageProducts products={data} meta={meta} />
    </div>
  );
};

export default ManageProductsPage;
