import { getFlashSaleProducts } from "@/services/FlashSale";
import FlashSaleProducts from "./FlashSaleProducts";

const FlashSale = async () => {
  const { data: products = [] } = await getFlashSaleProducts();

  return <FlashSaleProducts products={products} />;
};

export default FlashSale;
