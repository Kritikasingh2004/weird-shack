"use client";

import React, { useState, useMemo } from "react";
import ProductCard from "./ProductCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  quantity: number;
  quantity_sold: number;
  image_url?: string;
  date_created: string | Date;
}

const ProductGrid = ({ products }: { products: Product[] }) => {
  const [sortBy, setSortBy] = useState("newest");

  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "popular") return b.quantity_sold - a.quantity_sold;
      if (sortBy === "newest") {
        return (
          new Date(b.date_created).getTime() -
          new Date(a.date_created).getTime()
        );
      }
      return 0;
    });
  }, [products, sortBy]);

  return (
    <div className="w-full space-y-6">
      {/* Filter Header */}
      <div className="flex justify-between items-center px-4">
        <h2 className="text-2xl font-heading">Shop All</h2>
        <Select onValueChange={setSortBy} defaultValue="newest">
          <SelectTrigger className="w-[180px] border-2 border-border shadow-shadow">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="popular">Most Popular</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 p-4">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
