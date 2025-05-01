interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrls: string[];
  offerPrice?: number;
}

interface OrderProduct {
  _id: string;
  product: Product;
  quantity: number;
  unitPrice: number;
  color: string;
}

export interface Order {
  _id: string;
  createdAt: string;
  updatedAt: string;
  status: "Pending" | "Processing" | "Completed" | "Cancelled";
  paymentMethod: "COD" | "Online";
  paymentStatus: "Pending" | "Paid" | "Failed";
  products: OrderProduct[];
  totalAmount: number;
  discount: number;
  deliveryCharge: number;
  finalAmount: number;
  shippingAddress: string;
  coupon: string | null;
  shop: string;
}
