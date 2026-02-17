import React from "react";
import ImageCard from "./ui/image-card";
import { Product } from "./ProductGrid";
import Link from "next/link";

const ProductCard = ({ product }: { product: Product }) => {
  const isOutOfStock = product.quantity === 0;

  return (
    <Link href={`/products/${product.id}`}>
      <div className="relative group">
        <ImageCard
          caption={product.name}
          imageUrl={product.image_url || ""}
          className="hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none"
        >
          {/* Out of Stock Overlay Badge */}
          {isOutOfStock && (
            <div className="absolute top-4 left-[-10px] z-10 bg-red-500 text-white font-black uppercase text-xs px-3 py-1 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -rotate-12 select-none">
              Out of Stock
            </div>
          )}
          <div className="flex flex-col gap-2 p-2">
            <div className="flex justify-between items-center">
              <span className="font-heading text-lg uppercase">
                {product.name}
              </span>
              <span className="bg-main border-2 border-border px-2 py-0.5 font-bold text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                {product.currency} {product.price}
              </span>
            </div>

            <div className="flex justify-between items-center text-[10px] font-bold uppercase opacity-70">
              <span>Stock: {product.quantity}</span>
              {product.quantity_sold > 0 && (
                <span>Sold: {product.quantity_sold}</span>
              )}
            </div>
          </div>
        </ImageCard>
      </div>
    </Link>
  );
};

export default ProductCard;
