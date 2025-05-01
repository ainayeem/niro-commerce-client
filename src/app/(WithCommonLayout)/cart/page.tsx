import Address from "@/components/modules/cart/Address";
import CartProducts from "@/components/modules/cart/CartProducts";
import Coupon from "@/components/modules/cart/Coupon";
import PaymentDetails from "@/components/modules/cart/PaymentDetails";
import ProductBanner from "@/components/modules/products/banner";
import NCContainer from "@/components/ui/core/NCContainer/NCContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shopping Cart",
  description: "View your shopping cart on Nirocom — your online store for fashion, electronics, home essentials, and more.",
};

const CartPage = () => {
  return (
    <NCContainer>
      <ProductBanner title="Shopping Cart" path="Home - Cart" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 lg:gap-8 my-5 w-full p-4">
        <div className="col-span-1 md:col-span-8 space-y-4">
          <CartProducts />
        </div>
        <div className="col-span-1 md:col-span-4 space-y-4">
          <Coupon />
          <Address />
          <PaymentDetails />
        </div>
      </div>
    </NCContainer>
  );
};

export default CartPage;
