/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import type React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { X, ZoomIn, ZoomOut } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface ProductCarouselProps {
  images: string[];
  altText?: string;
  productName?: string;
  discountPercentage?: number;
}

const ProductCarousel = ({ images, altText = "Product image", productName = "", discountPercentage = 0 }: ProductCarouselProps) => {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [zoomLevel, setZoomLevel] = useState(2);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set([0]));

  useEffect(() => {
    if (!api) return;

    api.scrollTo(selectedImage);

    const onSelect = () => {
      const current = api.selectedScrollSnap();
      setCurrentIndex(current);
    };

    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api, selectedImage]);

  useEffect(() => {
    if (api) {
      const onSelect = () => {
        const current = api.selectedScrollSnap();
        if (current !== selectedImage) {
          setCurrentIndex(current);
          setSelectedImage(current);
        }
      };

      api.on("select", onSelect);
      return () => {
        api.off("select", onSelect);
      };
    }
  }, [api, selectedImage]);

  // Handle mouse move for zoom effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed || !imageContainerRef.current) return;

    const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect();

    // Calculate position as percentage
    const x = Math.max(0, Math.min(1, (e.clientX - left) / width));
    const y = Math.max(0, Math.min(1, (e.clientY - top) / height));

    setZoomPosition({ x, y });
  };

  // Toggle zoom state
  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
    if (!isZoomed) {
      // Reset zoom position to center when zooming in
      setZoomPosition({ x: 0.5, y: 0.5 });
    }
  };

  // Increase zoom level
  const increaseZoom = () => {
    if (zoomLevel < 4) {
      setZoomLevel(zoomLevel + 0.5);
    }
  };

  // Decrease zoom level
  const decreaseZoom = () => {
    if (zoomLevel > 1.5) {
      setZoomLevel(zoomLevel - 0.5);
    }
  };

  const handleImageLoad = (idx: number) => {
    setLoadedImages((prev) => new Set([...prev, idx]));
    if (idx === currentIndex) {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      {/* Main Carousel */}
      <div className="relative overflow-hidden rounded-xl bg-background border shadow-sm">
        <Carousel
          setApi={setApi}
          className="w-full"
          opts={{
            loop: true,
            align: "start",
          }}
          orientation="horizontal"
        >
          <CarouselContent>
            {images?.map((image, idx) => (
              <CarouselItem key={idx} className="basis-full">
                <div
                  ref={idx === currentIndex ? imageContainerRef : null}
                  className={cn(
                    "relative aspect-square w-full overflow-hidden cursor-zoom-in",
                    isZoomed && idx === currentIndex && "cursor-zoom-out"
                  )}
                  onClick={toggleZoom}
                  onMouseMove={handleMouseMove}
                >
                  {!loadedImages.has(idx) && (
                    <div className="absolute inset-0 flex items-center justify-center bg-muted/10">
                      <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                    </div>
                  )}
                  <div className={cn("w-full h-full transition-all duration-300", isZoomed && idx === currentIndex ? "absolute inset-0" : "")}>
                    <Image
                      src={image || "/placeholder.svg?height=600&width=600"}
                      alt={`${productName || altText} - View ${idx + 1}`}
                      fill
                      priority={idx === 0}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className={cn(
                        "object-contain transition-all duration-500",
                        !isZoomed && "hover:scale-105",
                        isZoomed && idx === currentIndex && "scale-100",
                        !loadedImages.has(idx) && "opacity-0"
                      )}
                      style={
                        isZoomed && idx === currentIndex
                          ? {
                              transformOrigin: `${zoomPosition.x * 100}% ${zoomPosition.y * 100}%`,
                              transform: `scale(${zoomLevel})`,
                              transition: "transform 0.1s ease-out",
                            }
                          : undefined
                      }
                      onLoad={() => handleImageLoad(idx)}
                    />
                  </div>

                  {/* Discount Badge */}
                  {idx === 0 && discountPercentage > 0 && (
                    <Badge className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1.5 text-xs font-semibold rounded-full shadow-sm">
                      {discountPercentage}% OFF
                    </Badge>
                  )}

                  {/* Image Counter */}
                  <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                    {idx + 1} / {images.length}
                  </div>
                  {!isZoomed && idx === currentIndex && (
                    <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="bg-black/50 text-white rounded-full p-2 backdrop-blur-sm">
                        <ZoomIn className="h-5 w-5" />
                      </div>
                    </div>
                  )}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {!isZoomed && (
            <>
              <CarouselPrevious className="left-4 h-8 w-8 sm:h-10 sm:w-10 bg-white/80 backdrop-blur-sm border shadow-sm" />
              <CarouselNext className="right-4 h-8 w-8 sm:h-10 sm:w-10 bg-white/80 backdrop-blur-sm border shadow-sm" />
            </>
          )}

          {/* Zoom Controls */}
          {isZoomed && (
            <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
              <Button variant="secondary" size="icon" className="h-8 w-8 bg-white/80 backdrop-blur-sm shadow-sm" onClick={increaseZoom}>
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button variant="secondary" size="icon" className="h-8 w-8 bg-white/80 backdrop-blur-sm shadow-sm" onClick={decreaseZoom}>
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button variant="secondary" size="icon" className="h-8 w-8 bg-white/80 backdrop-blur-sm shadow-sm" onClick={toggleZoom}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </Carousel>
      </div>

      {/* Thumbnail Selector */}
      {images.length > 1 && !isZoomed && (
        <div className="relative flex items-center justify-center">
          <div className="overflow-x-auto pb-2 hide-scrollbar">
            <div className="flex gap-2 px-2 min-w-full py-2">
              {images?.map((image, idx) => (
                <button
                  key={idx}
                  type="button"
                  aria-label={`View image ${idx + 1}`}
                  className={cn(
                    "relative aspect-square w-16 sm:w-20 flex-shrink-0 rounded-md overflow-hidden cursor-pointer transition-all duration-200",
                    selectedImage === idx
                      ? "ring-2 ring-primary ring-offset-2 scale-[0.95]"
                      : "ring-1 ring-gray-200 hover:ring-gray-300 opacity-80 hover:opacity-100"
                  )}
                  onClick={() => {
                    setSelectedImage(idx);
                    if (api) api.scrollTo(idx);
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
                  <Image
                    src={image || "/placeholder.svg?height=100&width=100"}
                    alt={`${productName || altText} thumbnail ${idx + 1}`}
                    fill
                    sizes="(max-width: 768px) 20vw, 10vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  {selectedImage === idx && (
                    <div className="absolute inset-0 flex items-center justify-center bg-primary/10 z-10">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCarousel;
