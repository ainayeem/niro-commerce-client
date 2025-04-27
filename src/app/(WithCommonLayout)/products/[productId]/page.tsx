import ProductBanner from "@/components/modules/products/banner";
import ProductDetails from "@/components/modules/products/productDetails";
import NCContainer from "@/components/ui/core/NCContainer/NCContainer";
import { getSingleProduct } from "@/services/ProductService";

const ProductDetailsPage = async ({ params }: { params: Promise<{ productId: string }> }) => {
  const { productId } = await params;

  const { data: product } = await getSingleProduct(productId);

  return (
    <NCContainer className="">
      <ProductBanner title="Product Details" path="Home - Products - Product Details" />
      <ProductDetails product={product} />
    </NCContainer>
  );
};

export default ProductDetailsPage;
