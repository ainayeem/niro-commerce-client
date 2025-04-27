"use client";
import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { addProduct } from "@/redux/features/cartSlice";
// import { addToWishlist } from "@/redux/features/wishListSlice";
import { useAppDispatch } from "@/redux/hooks";
import type { IProduct } from "@/types/product";
import { motion } from "framer-motion";
import { Eye, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

interface ProductCardProps {
  product: IProduct;
  className?: string;
  index?: number;
}

const ProductCard = ({ product, className, index = 0 }: ProductCardProps) => {
  const dispatch = useAppDispatch();
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  // const [isWishlistClicked, setIsWishlistClicked] = useState(false);

  const handleAddProduct = () => {
    if (product?.stock === 0) return;

    // Add a little animation to the button when clicked
    const button = document.getElementById(`add-to-cart-${product._id}`);
    if (button) {
      button.classList.add("scale-95");
      setTimeout(() => button.classList.remove("scale-95"), 150);
    }

    dispatch(addProduct(product));
    toast.success("Product added to cart", {
      description: `${product.name} has been added to your cart`,
      action: {
        label: "View Cart",
        onClick: () => (window.location.href = "/cart"),
      },
    });
  };

  // const handleAddToWishlist = (e: React.MouseEvent) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   setIsWishlistClicked(true);

  //   // Reset the animation after it completes
  //   setTimeout(() => setIsWishlistClicked(false), 1000);

  //   // dispatch(addToWishlist(product));
  //   toast.success("Added to wishlist", {
  //     description: `${product.name} has been added to your wishlist`,
  //     action: {
  //       label: "View Wishlist",
  //       onClick: () => (window.location.href = "/wishlist"),
  //     },
  //   });
  // };

  const discountPercentage = product?.offerPrice ? Math.round(((product.price - product.offerPrice) / product.price) * 100) : 0;

  // Calculate stock percentage for progress bar
  const stockPercentage = product?.stock ? Math.min(100, (product.stock / 20) * 100) : 0;
  const lowStock = product?.stock && product.stock < 10 && product.stock > 0;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.05 }}>
      <Card
        className={cn(
          "group h-full flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-300",
          isHovered ? "shadow-lg scale-[1.02] z-10 border-gray-300" : "shadow-sm hover:shadow-md",
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Section with enhanced interactions */}
        <div className="relative w-full aspect-square overflow-hidden">
          <Link href={`/products/${product?._id}`}>
            <div className="relative w-full h-full transition-all duration-500 group-hover:scale-105">
              {/* Main product image */}
              <Image
                src={product?.imageUrls[0] || "/placeholder.svg?height=240&width=320"}
                alt={product?.name || "Product image"}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className={cn("object-contain transition-opacity duration-300", isImageLoading ? "opacity-0" : "opacity-100")}
                onLoad={() => setIsImageLoading(false)}
              />

              {/* Second image on hover (if available) */}
              {product?.imageUrls[1] && (
                <Image
                  src={product.imageUrls[1] || "/placeholder.svg"}
                  alt={`${product?.name} - alternate view`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className={cn("object-contain transition-opacity duration-300", isHovered && !isImageLoading ? "opacity-100" : "opacity-0")}
                />
              )}

              {/* Loading spinner */}
              {isImageLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
                </div>
              )}
            </div>
          </Link>

          {/* Enhanced badges with animations */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product?.stock === 0 ? (
              <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.3 }}>
                <Badge variant="destructive" className="px-2 py-1 text-xs font-medium rounded-md">
                  Out of Stock
                </Badge>
              </motion.div>
            ) : discountPercentage > 0 ? (
              <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.3 }}>
                <Badge className="px-2 py-1 text-xs font-medium bg-emerald-500 text-white rounded-md">-{discountPercentage}% OFF</Badge>
              </motion.div>
            ) : null}

            {/* Low stock indicator */}
            {lowStock && (
              <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.3, delay: 0.1 }}>
                <Badge variant="outline" className="px-2 py-1 text-xs font-medium bg-amber-50 text-amber-700 border-amber-200 rounded-md">
                  Only {product.stock} left
                </Badge>
              </motion.div>
            )}
          </div>

          {/* Action buttons overlay on hover */}
          <div
            className={cn(
              "absolute inset-0 bg-black/5 flex items-center justify-center gap-2 transition-opacity duration-300",
              isHovered ? "opacity-100" : "opacity-0"
            )}
          >
            {/* Quick view button */}
            <Link href={`/products/${product?._id}`}>
              <Button
                variant="secondary"
                size="sm"
                className="rounded-full bg-white/90 backdrop-blur-sm shadow-sm hover:bg-emerald-500 hover:text-white transition-colors h-9 w-9"
              >
                <Eye className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Wishlist Button with animation */}
          {/* <motion.div
            className="absolute top-2 right-2"
            whileTap={{ scale: 0.9 }}
            animate={
              isWishlistClicked
                ? {
                    scale: [1, 1.2, 1],
                    transition: { duration: 0.3 },
                  }
                : {}
            }
          >
            <Button
              onClick={handleAddToWishlist}
              variant="secondary"
              size="icon"
              className={cn(
                "h-8 w-8 rounded-full bg-white/90 backdrop-blur-sm shadow-sm transition-colors",
                isWishlistClicked
                  ? "bg-emerald-500 text-white"
                  : "hover:bg-emerald-50 hover:text-emerald-500"
              )}
            >
              <Heart
                className={cn("h-4 w-4", isWishlistClicked && "fill-current")}
              />
            </Button>
          </motion.div> */}
        </div>

        {/* Product Info with enhanced styling */}
        <CardContent className="flex-grow p-4">
          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="text-xs font-medium text-gray-600">{product?.averageRating || "0.0"}</span>
          </div>

          {/* Title with better hover effect */}
          <Link href={`/products/${product?._id}`} className="block group-hover:text-emerald-500 transition-colors">
            <h3 className="text-md font-semibold line-clamp-2 mb-2 min-h-[2.5rem]">{product?.name}</h3>
          </Link>

          {/* Price with enhanced styling */}
          <div className="flex items-baseline gap-1.5 mt-auto">
            {product?.offerPrice ? (
              <>
                <span className="text-lg font-semibold text-emerald-500">${product?.offerPrice}</span>
                <span className="text-xs text-gray-400 line-through">${product?.price}</span>
              </>
            ) : (
              <span className="text-lg font-semibold text-gray-800">${product?.price}</span>
            )}
          </div>

          {/* Stock progress bar for limited items */}
          {lowStock && (
            <div className="mt-2">
              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-emerald-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${stockPercentage}%` }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Selling fast!</p>
            </div>
          )}
        </CardContent>

        {/* Action Button with enhanced interaction */}
        <CardFooter className="p-4 pt-0">
          <motion.div className="w-full" whileTap={{ scale: 0.98 }}>
            <Button
              id={`add-to-cart-${product._id}`}
              onClick={handleAddProduct}
              disabled={product?.stock === 0}
              variant="default"
              size="sm"
              className={cn(
                "w-full h-10 rounded-full text-sm font-medium transition-all",
                product?.stock === 0 ? "bg-gray-200 text-gray-500" : "bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm hover:shadow"
              )}
            >
              <ShoppingCart className="w-4 h-4 mr-1.5" />
              {product?.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
