/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import { getAllBrands } from "@/services/BrandService";
import { getAllCategories } from "@/services/CategoryService";
import { Star } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface FilterSidebarProps {
  onFilterApplied?: () => void;
}

export default function FilterSidebar({ onFilterApplied }: FilterSidebarProps) {
  const [price, setPrice] = useState([0]);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [{ data: categoriesData }, { data: brandsData }] = await Promise.all([getAllCategories("1", "100"), getAllBrands("1", "100")]);
        setCategories(categoriesData);
        setBrands(brandsData);
      } catch (error: any) {
        console.error(error);
        toast.error("Failed to fetch filters");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSearchQuery = (query: string, value: string | number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(query, value.toString());

    router.push(`${pathname}?${params.toString()}`, {
      scroll: false,
    });

    if (onFilterApplied) {
      onFilterApplied();
    }
  };

  const clearFilters = () => {
    router.push(`${pathname}`, {
      scroll: false,
    });

    if (onFilterApplied) {
      onFilterApplied();
    }
  };

  return (
    <div className="p-4 md:p-6 bg-white rounded-lg h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Filters</h2>
        {searchParams.toString().length > 0 && (
          <Button onClick={clearFilters} size="sm" variant="outline" className="text-xs">
            Clear All
          </Button>
        )}
      </div>

      <div className="space-y-6">
        {/* Filter by Price */}
        <div className="pb-2">
          <h3 className="text-base font-medium mb-4">Price Range</h3>
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-500">$0</span>
            <span className="text-gray-500">$500,000</span>
          </div>
          <Slider
            max={500000}
            step={1000}
            value={price}
            onValueChange={(value) => {
              setPrice(value);
              handleSearchQuery("price", value[0]);
            }}
            className="w-full"
          />
          <p className="text-sm mt-3 font-medium text-primary">Selected: ${price[0].toLocaleString()}</p>
        </div>

        {/* Mobile Accordion Layout */}
        <div className="md:hidden">
          <Accordion type="multiple" className="w-full">
            {/* Categories Accordion */}
            <AccordionItem value="categories">
              <AccordionTrigger className="text-base font-medium py-2">Categories</AccordionTrigger>
              <AccordionContent>
                {isLoading ? (
                  <div className="space-y-2">
                    {[1, 2, 3]?.map((i) => (
                      <Skeleton key={i} className="h-6 w-full" />
                    ))}
                  </div>
                ) : (
                  <RadioGroup className="space-y-2 mt-2">
                    {categories?.map((category: { _id: string; name: string }) => (
                      <div key={category._id} className="flex items-center space-x-2">
                        <RadioGroupItem
                          onClick={() => handleSearchQuery("category", category._id)}
                          value={category._id}
                          id={`mobile-${category._id}`}
                        />
                        <Label htmlFor={`mobile-${category._id}`} className="text-gray-600 text-sm">
                          {category.name}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}
              </AccordionContent>
            </AccordionItem>

            {/* Brands Accordion */}
            <AccordionItem value="brands">
              <AccordionTrigger className="text-base font-medium py-2">Brands</AccordionTrigger>
              <AccordionContent>
                {isLoading ? (
                  <div className="space-y-2">
                    {[1, 2, 3]?.map((i) => (
                      <Skeleton key={i} className="h-6 w-full" />
                    ))}
                  </div>
                ) : (
                  <RadioGroup className="space-y-2 mt-2">
                    {brands?.map((brand: { _id: string; name: string }) => (
                      <div key={brand._id} className="flex items-center space-x-2">
                        <RadioGroupItem onClick={() => handleSearchQuery("brand", brand._id)} value={brand._id} id={`mobile-${brand._id}`} />
                        <Label htmlFor={`mobile-${brand._id}`} className="text-gray-600 text-sm">
                          {brand.name}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}
              </AccordionContent>
            </AccordionItem>

            {/* Rating Accordion */}
            <AccordionItem value="rating">
              <AccordionTrigger className="text-base font-medium py-2">Rating</AccordionTrigger>
              <AccordionContent>
                <RadioGroup className="space-y-3 mt-2">
                  {[5, 4, 3, 2, 1]?.map((rating) => (
                    <div key={rating} className="flex items-center space-x-2">
                      <RadioGroupItem onClick={() => handleSearchQuery("rating", rating)} value={`${rating}`} id={`mobile-rating-${rating}`} />
                      <Label htmlFor={`mobile-rating-${rating}`} className="flex items-center">
                        {Array.from({ length: 5 }, (_, i) => (
                          <Star size={16} key={i} fill={i < rating ? "orange" : "lightgray"} stroke={i < rating ? "orange" : "lightgray"} />
                        ))}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:block space-y-6">
          {/* Product Categories */}
          <div>
            <h3 className="text-base font-medium mb-3">Categories</h3>
            {isLoading ? (
              <div className="space-y-2">
                {[1, 2, 3]?.map((i) => (
                  <Skeleton key={i} className="h-6 w-full" />
                ))}
              </div>
            ) : (
              <RadioGroup className="space-y-2">
                {categories?.map((category: { _id: string; name: string }) => (
                  <div key={category._id} className="flex items-center space-x-2">
                    <RadioGroupItem onClick={() => handleSearchQuery("category", category._id)} value={category._id} id={category._id} />
                    <Label htmlFor={category._id} className="text-gray-600 text-sm">
                      {category.name}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}
          </div>

          {/* Brands */}
          <div>
            <h3 className="text-base font-medium mb-3">Brands</h3>
            {isLoading ? (
              <div className="space-y-2">
                {[1, 2, 3]?.map((i) => (
                  <Skeleton key={i} className="h-6 w-full" />
                ))}
              </div>
            ) : (
              <RadioGroup className="space-y-2">
                {brands?.map((brand: { _id: string; name: string }) => (
                  <div key={brand._id} className="flex items-center space-x-2">
                    <RadioGroupItem onClick={() => handleSearchQuery("brand", brand._id)} value={brand._id} id={brand._id} />
                    <Label htmlFor={brand._id} className="text-gray-600 text-sm">
                      {brand.name}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}
          </div>

          {/* Rating */}
          <div>
            <h3 className="text-base font-medium mb-3">Rating</h3>
            <RadioGroup className="space-y-3">
              {[5, 4, 3, 2, 1]?.map((rating) => (
                <div key={rating} className="flex items-center space-x-2">
                  <RadioGroupItem onClick={() => handleSearchQuery("rating", rating)} value={`${rating}`} id={`rating-${rating}`} />
                  <Label htmlFor={`rating-${rating}`} className="flex items-center">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star size={16} key={i} fill={i < rating ? "orange" : "lightgray"} stroke={i < rating ? "orange" : "lightgray"} />
                    ))}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>
      </div>
    </div>
  );
}
