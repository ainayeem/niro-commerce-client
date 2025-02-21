import CartProducts from "@/components/modules/cart/CartProducts";
import Coupon from "@/components/modules/cart/Coupon";
import ProductBanner from "@/components/modules/products/banner";
import NCContainer from "@/components/ui/core/NCContainer/NCContainer";

const CartPage = () => {
  return (
    <NCContainer>
      <ProductBanner title="Cart Page" path="Home - Cart" />
      <div className="grid grid-cols-12 gap-8 my-5">
        <CartProducts />
        <Coupon />
      </div>
    </NCContainer>
  );
};

export default CartPage;
