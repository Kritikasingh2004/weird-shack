import React from "react";
import ImageCard from "@/components/ui/image-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import Link from "next/link";

async function getProduct(id: string) {
  const baseUrl = process.env.API_URL || "http://localhost:8000";
  const res = await fetch(`${baseUrl}/products/${id}`, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);

  const isOutOfStock = product?.quantity === 0;

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <h1 className="text-4xl font-heading uppercase italic text-red-500">
          404: Not Found
        </h1>
        <Link href="/">
          <Button>Go Back Home</Button>
        </Link>
      </div>
    );
  }

  // Handle description: single para vs list
  const description = product.description;
  const isList = Array.isArray(description) && description.length > 1;

  return (
    <div className="max-w-[90%] mx-auto py-10 space-y-8">
      <Link
        href="/"
        className="inline-flex items-center gap-2 font-bold hover:underline"
      >
        <ArrowLeft className="w-4 h-4" /> BACK TO THE SHACK
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* LEFT COLUMN: Large Image */}
        <div className="lg:col-span-7">
          <ImageCard
            imageUrl={product.image_url}
            className="w-full shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]"
          />
        </div>

        {/* RIGHT COLUMN: Info & Actions */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="p-6 border-4 border-border bg-secondary-background shadow-shadow space-y-6">
            <header className="space-y-2">
              <div className="flex justify-between items-start">
                <h1 className="text-5xl font-heading uppercase leading-none">
                  {product.name}
                </h1>
                <Badge className="bg-main text-main-foreground border-2 border-border text-lg px-4 py-1 shadow-shadow">
                  {product.currency} {product.price}
                </Badge>
              </div>
            </header>

            <div className="flex items-center justify-between border-b-2 border-border pb-4">
              <span className="font-bold uppercase">Availability</span>
              <span
                className={
                  product.quantity > 0
                    ? "text-green-600 font-black"
                    : "text-red-500 font-black"
                }
              >
                {product.quantity > 0
                  ? `${product.quantity} IN STOCK`
                  : "OUT OF STOCK"}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <Button
                className="flex-1 h-14 text-xl font-heading uppercase bg-main border-2 border-border shadow-shadow hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all"
                disabled={isOutOfStock}
              >
                <ShoppingCart className="mr-2" /> Buy Now
              </Button>
            </div>
          </div>

          {/* Description Section */}
          <div className="space-y-4 pl-2">
            <h3 className="font-heading uppercase text-sm border-b-2 border-border inline-block">
              Product Info
            </h3>
            {isList ? (
              <ul className="list-inside space-y-2">
                {description.map((item: string, i: number) => (
                  <li
                    key={i}
                    className="text-lg font-medium opacity-90 flex gap-2"
                  >
                    <span className="text-main font-black">»</span> {item}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xl font-medium opacity-80 leading-relaxed">
                {Array.isArray(description) ? description[0] : description}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
