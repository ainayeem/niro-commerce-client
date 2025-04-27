/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { type CarouselApi } from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";
import { addProduct } from "@/redux/features/cartSlice";
// import { addToWishlist } from "@/redux/features/wishListSlice";
import { useAppDispatch } from "@/redux/hooks";
import type { IProduct } from "@/types";
import { Check, Minus, Plus, Share2, ShoppingCart, Star, Truck } from "lucide-react";
import { useEffect, useState } from "react";
import ProductCarousel from "../productCarousel.tsx";

interface ProductDetailsProps {
  product: IProduct;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [api, setApi] = useState<CarouselApi | null>(null);
  const isMobile = useIsMobile();

  // Calculate discount percentage if there's an offer price
  const discountPercentage: number = product?.offerPrice ? Math.round(((product.price - product.offerPrice) / product.price) * 100) : 0;

  // Sync the carousel with the selected thumbnail
  useEffect(() => {
    if (!api) return;
    api.scrollTo(selectedImage);
  }, [api, selectedImage]);

  // Handle add to cart
  const handleAddToCart = (): void => {
    if (!product || product.stock === 0) return;

    // Add product multiple times based on quantity
    for (let i = 0; i < quantity; i++) {
      dispatch(addProduct(product));
    }
  };

  // Handle add to wishlist
  // const handleAddToWishlist = (): void => {
  //   if (!product) return;
  //   dispatch(addToWishlist(product));
  // };

  // Handle share
  const handleShare = async (): Promise<void> => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: `Check out this product: ${product.name}`,
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href);
    }
  };

  // Safety check for product
  if (!product) {
    return <div className="p-8 text-center">Product not found</div>;
  }

  return (
    <div className="container mx-auto w-full mt-14">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Product Images Section */}
        <div className="space-y-6">
          <ProductCarousel images={product.imageUrls} altText={product.name} productName={product.name} discountPercentage={discountPercentage} />
        </div>

        {/* Product Info Section */}
        <div className="flex flex-col space-y-6">
          {/* Product Header */}
          <div className="space-y-2">
            {product.brand?.name && (
              <div className="flex items-center">
                <Badge variant="outline" className="text-xs font-medium px-2.5 py-0.5 bg-primary/5 text-primary border-primary/20">
                  {product.brand.name}
                </Badge>
                {product.category?.name && (
                  <>
                    <span className="mx-2 text-gray-300">•</span>
                    <span className="text-sm text-gray-500">{product.category.name}</span>
                  </>
                )}
              </div>
            )}

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">{product.name}</h1>

            <div className="flex items-center flex-wrap gap-2 sm:gap-4">
              {/* Rating */}
              <div className="flex items-center">
                <div className="flex">
                  {Array.from({ length: 5 })?.map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4"
                      fill={i < Math.floor(product.averageRating || 0) ? "#FBBF24" : "transparent"}
                      stroke={i < Math.floor(product.averageRating || 0) ? "#FBBF24" : "#D1D5DB"}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-500">
                  {product.averageRating} ({product.ratingCount || 0} ratings)
                </span>
              </div>

              {/* Stock Status */}
              {product.stock > 0 ? (
                <div className="flex items-center text-sm">
                  <Check className="w-4 h-4 mr-1 text-green-500" />
                  <span className="text-green-700">In Stock ({product.stock} available)</span>
                </div>
              ) : (
                <div className="flex items-center text-sm text-red-600">
                  <Minus className="w-4 h-4 mr-1" />
                  <span>Out of Stock</span>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Price Section */}
          <div className="space-y-4">
            <div className="flex items-baseline flex-wrap gap-2">
              {product.offerPrice ? (
                <>
                  <span className="text-2xl sm:text-3xl font-bold text-gray-900">${product.offerPrice}</span>
                  <span className="text-base sm:text-lg text-gray-500 line-through">${product.price}</span>
                  <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
                    Save {discountPercentage}%
                  </Badge>
                </>
              ) : (
                <span className="text-2xl sm:text-3xl font-bold text-gray-900">${product.price}</span>
              )}
            </div>

            {/* Shipping Info */}
            <div className="flex items-center text-sm text-gray-600">
              <Truck className="w-4 h-4 mr-2 text-primary" />
              <span>Free shipping on orders over $50</span>
            </div>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="space-y-6 pt-2">
            {/* Quantity Selector */}
            {product.stock > 0 && (
              <div className="flex flex-wrap items-center gap-4">
                <span className="text-sm font-medium text-gray-700">Quantity:</span>
                <div className="flex items-center">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-9 w-9 rounded-l-md rounded-r-none border-r-0"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                    <span className="sr-only">Decrease quantity</span>
                  </Button>
                  <div className="h-9 px-4 flex items-center justify-center border border-input bg-background min-w-[3rem]">{quantity}</div>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-9 w-9 rounded-r-md rounded-l-none border-l-0"
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="h-4 w-4" />
                    <span className="sr-only">Increase quantity</span>
                  </Button>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                type="button"
                className="flex-1 rounded-full h-11 sm:h-12 text-base"
                size={isMobile ? "default" : "lg"}
                disabled={product.stock === 0}
                onClick={handleAddToCart}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
              <div className="flex gap-3">
                {/* <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-11 w-11 sm:h-12 sm:w-12 rounded-full"
                  onClick={handleAddToWishlist}
                  aria-label="Add to wishlist"
                >
                  <Heart className="h-5 w-5" />
                </Button> */}
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-11 w-11 sm:h-12 sm:w-12 rounded-full"
                  onClick={handleShare}
                  aria-label="Share product"
                >
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          <Separator className="my-2" />

          {/* Product Details Tabs */}
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3 h-11 sm:h-12 rounded-lg">
              <TabsTrigger value="description" className="text-xs sm:text-sm">
                Description
              </TabsTrigger>
              <TabsTrigger value="features" className="text-xs sm:text-sm">
                Features
              </TabsTrigger>
              <TabsTrigger value="shipping" className="text-xs sm:text-sm">
                Shipping
              </TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-6 text-gray-700">
              <div className="prose prose-sm max-w-none">
                <p className="leading-relaxed text-sm sm:text-base">{product.description}</p>
              </div>
            </TabsContent>
            <TabsContent value="features" className="mt-6">
              <ul className="space-y-3 text-sm sm:text-base text-gray-700">
                {product.keyFeatures?.map((feature: string, idx: number) => (
                  <li key={idx} className="flex items-start">
                    <Check className="w-5 h-5 mr-2 text-primary flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="shipping" className="mt-6">
              <div className="space-y-4 text-sm sm:text-base text-gray-700">
                <div className="flex items-start">
                  <Truck className="w-5 h-5 mr-3 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Free Standard Shipping</h4>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">Delivered in 3-5 business days</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Truck className="w-5 h-5 mr-3 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Express Shipping</h4>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">Delivered in 1-2 business days ($9.99)</p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm border-t border-gray-100 pt-4 mt-4">
                  Returns accepted within 30 days of delivery. Items must be unused and in original packaging.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
