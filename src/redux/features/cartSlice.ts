/* eslint-disable @typescript-eslint/no-explicit-any */
import { addCoupon } from "@/services/cart";
import { IProduct } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface CartProduct extends IProduct {
  orderQuantity: number;
}

interface InitialState {
  products: CartProduct[];
  city: string;
  shippingAddress: string;
  shopId: string;
  coupon: {
    code: string;
    discountAmount: number;
    isLoading: boolean;
    error: string;
  };
}

const initialState: InitialState = {
  products: [],
  city: "",
  shippingAddress: "",
  shopId: "",
  coupon: {
    code: "",
    discountAmount: 0,
    isLoading: false,
    error: "",
  },
};

export const fetchCoupon = createAsyncThunk<any, any, any>("cart/fetchCoupon", async ({ couponCode, subTotal, shopId }) => {
  try {
    const res = await addCoupon(couponCode, subTotal, shopId);

    if (!res.success) {
      throw new Error(res.message);
    }

    return res;
  } catch (err) {
    console.log(err);
    throw new Error((err as Error).message);
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      if (state.products.length > 0 && state.shopId !== action.payload.shop._id) {
        throw new Error("Please purchase order from this shop first.");
      }

      if (!state.products.length) {
        state.shopId = action.payload.shop._id;
      }

      const productToAdd = state.products.find((product) => product._id === action.payload._id);

      if (productToAdd) {
        productToAdd.orderQuantity += 1;
        return;
      }

      state.products.push({ ...action.payload, orderQuantity: 1 });
    },

    incrementOrderQuantity: (state, action) => {
      const productToIncrement = state.products.find((product) => product._id === action.payload);

      if (productToIncrement) {
        productToIncrement.orderQuantity += 1;
        return;
      }
    },

    decrementOrderQuantity: (state, action) => {
      const productToIncrement = state.products.find((product) => product._id === action.payload);

      if (productToIncrement && productToIncrement.orderQuantity > 1) {
        productToIncrement.orderQuantity -= 1;
        return;
      }
    },

    removeProduct: (state, action) => {
      state.products = state.products.filter((product) => product._id !== action.payload);
    },

    updateCity: (state, action) => {
      state.city = action.payload;
    },

    updateShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
    },

    clearCart: (state) => {
      state.products = [];
      state.city = "";
      state.shippingAddress = "";
    },
  },

  // extra reducer
  extraReducers: (builder) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    builder.addCase(fetchCoupon.pending, (state, action) => {
      // console.log("🚀 ~ builder.addCase ~ action:pending", action);
      state.coupon.isLoading = true;
      state.coupon.error = "";
    });
    builder.addCase(fetchCoupon.rejected, (state, action) => {
      // console.log("🚀 ~ builder.addCase ~ action:rejected", action);
      state.coupon.isLoading = false;
      state.coupon.error = action.error.message as string;
      state.coupon.code = "";
      state.coupon.discountAmount = 0;
    });
    builder.addCase(fetchCoupon.fulfilled, (state, action) => {
      // console.log("🚀 ~ builder.addCase ~ action:fulfilled", action);
      state.coupon.isLoading = false;
      state.coupon.error = "";
      state.coupon.code = action.payload.data.coupon.code;
      state.coupon.discountAmount = action.payload.data.discountAmount;
    });
  },
});

//* products

export const orderedProductsSelector = (state: RootState) => {
  return state.cart.products;
};

export const cartProductsSelector = (state: RootState) => {
  return state.cart.products;
};

export const orderSelector = (state: RootState) => {
  return {
    products: state.cart.products.map((product) => ({
      product: product._id,
      quantity: product.orderQuantity,
      color: "white",
    })),
    shippingAddress: `${state.cart.shippingAddress} - ${state.cart.city}`,
    paymentMethod: "Online",
  };
};

export const shopSelector = (state: RootState) => {
  return state.cart.shopId;
};

//* Payment
export const subTotalSelector = (state: RootState) => {
  return state.cart.products.reduce((acc, product) => {
    if (product.offerPrice) {
      // console.log(product.offerPrice);
      return acc + product.offerPrice * product.orderQuantity;
    } else {
      // console.log(product.price, "Price");
      return acc + product.price * product.orderQuantity;
    }
  }, 0);
};

export const shippingCostSelector = (state: RootState) => {
  const { city, products } = state.cart;
  if (!city || products.length === 0) return 0;
  return city === "Dhaka" ? 60 : 120;
};

export const grandTotalSelector = (state: RootState) => {
  const subTotal = subTotalSelector(state);
  const shippingCost = shippingCostSelector(state);
  const discountAmount = discountAmountSelector(state);

  return subTotal - discountAmount + shippingCost;
};

export const couponSelector = (state: RootState) => {
  return state.cart.coupon;
};

export const discountAmountSelector = (state: RootState) => {
  return state.cart.coupon.discountAmount;
};

//* Address
export const citySelector = (state: RootState) => {
  return state.cart.city;
};

export const shippingAddressSelector = (state: RootState) => {
  return state.cart.shippingAddress;
};

export const {
  addProduct,
  incrementOrderQuantity,
  decrementOrderQuantity,
  removeProduct,
  //
  updateCity,
  updateShippingAddress,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
