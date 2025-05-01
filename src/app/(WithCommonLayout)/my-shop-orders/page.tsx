import ProductBanner from "@/components/modules/products/banner";
import MyShopOrders from "@/components/modules/user/myShopOrder/MyShopOrders";
import { getMyShopOrders } from "@/services/OrderService";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Shop Orders",
  description: "View your shop orders on Nirocom — your online store for fashion, electronics, home essentials, and more.",
};

const MyShopOrdersPage = async () => {
  const { data: orders } = await getMyShopOrders();
  return (
    <div className="container mx-auto px-4 py-8 space-y-10">
      <ProductBanner title="My Shop Orders" path="Home - My Shop Orders" />
      <MyShopOrders orders={orders} />
    </div>
  );
};

export default MyShopOrdersPage;
