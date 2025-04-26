import { Button } from "@/components/ui/button";
import { CartProduct, decrementOrderQuantity, incrementOrderQuantity, removeProduct } from "@/redux/features/cartSlice";
import { useAppDispatch } from "@/redux/hooks";
import { motion } from "framer-motion";
import { Minus, Plus, Trash } from "lucide-react";
import Image from "next/image";

export default function CartProductCard({ product }: { product: CartProduct }) {
  const dispatch = useAppDispatch();

  const handleIncrementQuantity = (id: string) => {
    dispatch(incrementOrderQuantity(id));
  };

  const handleDecrementQuantity = (id: string) => {
    dispatch(decrementOrderQuantity(id));
  };

  const handleRemoveProduct = (id: string) => {
    dispatch(removeProduct(id));
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      x: -100,
      transition: {
        duration: 0.2,
        ease: "easeIn",
      },
    },
  };

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  return (
    <motion.div
      className="bg-white rounded-lg flex flex-col sm:flex-row p-4 gap-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={cardVariants}
      layout
    >
      {/* Product Image */}
      <div className="w-full sm:w-32 h-32 rounded-md overflow-hidden bg-gray-50 flex-shrink-0">
        <Image
          src={product?.imageUrls?.[0]}
          height={200}
          width={200}
          alt={product?.name || "Product image"}
          className="w-full h-full object-cover"
          priority
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-col justify-between flex-grow gap-3">
        <div>
          <h1 className="text-lg sm:text-xl font-semibold line-clamp-2">{product?.name}</h1>

          <div className="flex flex-wrap gap-3 my-2 text-sm sm:text-base">
            <p className="flex items-center gap-1">
              <span className="text-gray-500">Color:</span>
              <span className="font-medium">Black</span>
            </p>
            <p className="flex items-center gap-1">
              <span className="text-gray-500">Stock:</span>
              <span className={`font-medium ${product?.stock < 10 ? "text-amber-600" : "text-green-600"}`}>{product?.stock}</span>
            </p>
          </div>
        </div>

        <hr className="border-t border-gray-100" />

        {/* Price and Quantity Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <p className="text-gray-700">Price:</p>
            <p className="font-bold text-lg">
              {product.offerPrice ? (
                <>
                  <span className="text-red-500">${product.offerPrice}</span>
                  <span className="ml-2 text-gray-400 line-through text-sm">${product.price}</span>
                </>
              ) : (
                <span>${product.price}</span>
              )}
            </p>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-2">
            <div className="flex items-center gap-1 sm:gap-2">
              <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                <Button
                  onClick={() => handleDecrementQuantity(product._id)}
                  variant="outline"
                  size="sm"
                  className="size-8 rounded-sm"
                  disabled={product?.orderQuantity <= 1}
                >
                  <Minus className="size-3 sm:size-4" />
                </Button>
              </motion.div>

              <p className="font-medium text-base sm:text-lg px-2 min-w-8 text-center">{product?.orderQuantity}</p>

              <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                <Button
                  onClick={() => handleIncrementQuantity(product._id)}
                  variant="outline"
                  size="sm"
                  className="size-8 rounded-sm"
                  disabled={product?.orderQuantity >= product?.stock}
                >
                  <Plus className="size-3 sm:size-4" />
                </Button>
              </motion.div>
            </div>

            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap" initial={{ opacity: 0.7 }} animate={{ opacity: 1 }}>
              <Button
                onClick={() => handleRemoveProduct(product._id)}
                variant="ghost"
                size="sm"
                className="size-8 rounded-sm text-red-500 hover:text-red-600 hover:bg-red-50"
              >
                <Trash className="size-4" />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
