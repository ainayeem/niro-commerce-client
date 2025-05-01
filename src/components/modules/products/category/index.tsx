"use client";

import CategoryCard from "@/components/ui/core/CategoryCard/CategoryCard";
import { ICategory } from "@/types";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const Category = ({ categories }: { categories: ICategory[] }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 3000 })]);

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!emblaApi) return;

    const updateScrollButtons = () => {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };

    emblaApi.on("select", updateScrollButtons);
    updateScrollButtons();
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="py-6 px-2">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-2xl text-primary">All Categories</h2>
        <div className="flex gap-2">
          <button
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            className={`p-2 bg-primary/40 hover:bg-gray-300 rounded-full transition duration-200 ${
              !canScrollPrev ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={scrollNext}
            disabled={!canScrollNext}
            className={`p-2 bg-primary/40 hover:bg-gray-300 rounded-full transition duration-200 ${
              !canScrollNext ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Embla Carousel Wrapper */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4 py-2 flex-nowrap pl-[20px] pr-[20px]">
          {categories?.map((category) => (
            <div key={category._id} className="flex-shrink-0 w-[110px]">
              <CategoryCard category={category} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
