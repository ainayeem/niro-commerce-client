import ProductBanner from "@/components/modules/products/banner";
import MyOrders from "@/components/modules/user/userProfile/my-order/MyOrders";
import { getMyOrders } from "@/services/OrderService";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Orders",
  description: "View your orders on Nirocom — your online store for fashion, electronics, home essentials, and more.",
};

const MyOrdersPage = async () => {
  const { data: orders } = await getMyOrders();

  return (
    <div className="container mx-auto px-4 py-8 space-y-10">
      <ProductBanner title="My Orders" path="Home - My Orders" />
      <MyOrders orders={orders} />
    </div>
  );
};

export default MyOrdersPage;
