"use client";
import { Badge } from "@/components/ui/badge";
import type React from "react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { addProduct } from "@/redux/features/cartSlice";
// import { addToWishlist } from "@/redux/features/wishListSlice";
import { useAppDispatch } from "@/redux/hooks";
import type { IProduct } from "@/types/product";
import { Clock, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface FlashSaleProductCardProps {
  product: IProduct;
}

const FlashSaleProductCard = ({ product }: FlashSaleProductCardProps) => {
  const dispatch = useAppDispatch();
  const [isImageLoading, setIsImageLoading] = useState<boolean>(true);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    e.stopPropagation();

    if (product.stock === 0) return;
    dispatch(addProduct(product));
  };

  //   const handleAddToWishlist = (
  //     e: React.MouseEvent<HTMLButtonElement>
  //   ): void => {
  //     e.preventDefault();
  //     e.stopPropagation();

  //     dispatch(addToWishlist(product));
  //   };

  // Calculate discount percentage if there's an offer price
  const discountPercentage: number = product.offerPrice ? Math.round(((product.price - product.offerPrice) / product.price) * 100) : 0;

  return (
    <Link href={`/products/${product._id}`}>
      <Card className="group h-full overflow-hidden rounded-lg border bg-background shadow-sm transition-all duration-300 hover:shadow-md">
        {/* Flash Sale Badge */}
        <div className="relative">
          <div className="absolute left-0 top-0 z-10 flex items-center gap-1 rounded-br-lg bg-red-500 px-2 py-1 text-xs font-medium text-white">
            <Clock className="h-3 w-3" />
            Flash Sale
          </div>

          {/* Image Section */}
          <div className="relative aspect-video overflow-hidden bg-muted/20">
            {product.imageUrls?.[0] && (
              <Image
                src={product.imageUrls[0] || "/placeholder.svg?height=300&width=400"}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className={cn("object-cover transition-all duration-500 group-hover:scale-110", isImageLoading ? "opacity-0" : "opacity-100")}
                onLoad={() => setIsImageLoading(false)}
              />
            )}

            {isImageLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              </div>
            )}

            {/* Discount Badge */}
            {discountPercentage > 0 && <Badge className="absolute right-2 top-2 bg-primary">{discountPercentage}% OFF</Badge>}

            {/* Out of Stock Badge */}
            {product.stock === 0 && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                <Badge variant="destructive" className="px-3 py-1.5 text-sm font-semibold">
                  Out of Stock
                </Badge>
              </div>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4">
          {/* Rating */}
          <div className="mb-2 flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span className="text-xs font-medium">{product.averageRating || "0.0"}</span>
          </div>

          <h3 className="font-medium text-sm md:text-base line-clamp-2 h-[3rem] mb-1">{product?.name}</h3>

          {/* Price Section */}
          <div className="mb-3 flex items-baseline gap-2">
            {product.offerPrice ? (
              <>
                <span className="text-lg font-bold text-red-500 sm:text-xl">${product.offerPrice}</span>
                <span className="text-sm text-muted-foreground line-through">${product.price}</span>
              </>
            ) : (
              <span className="text-lg font-bold text-primary sm:text-xl">${product.price}</span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={cn(
                "flex flex-1 items-center justify-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                product.stock === 0 ? "bg-muted text-muted-foreground cursor-not-allowed" : "bg-primary text-primary-foreground hover:bg-primary/90"
              )}
            >
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </button>

            {/* <button
              type="button"
              onClick={handleAddToWishlist}
              className="flex h-9 w-9 items-center justify-center rounded-full border bg-background text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
              aria-label="Add to wishlist"
            >
              <Heart className="h-4 w-4" />
            </button> */}
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default FlashSaleProductCard;
