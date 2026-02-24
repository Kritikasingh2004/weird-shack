"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Plus, Pencil, ImagePlus } from "lucide-react";
import { Product } from "../ProductGrid";
import { useState } from "react";

interface ProductFormProps {
  product?: Product;
  onProductSaved: (product: Product) => void;
}

const ProductForm = ({ product, onProductSaved }: ProductFormProps) => {
  const isEditing = !!product;

  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {isEditing ? (
          <Button
            size="icon"
            className="border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-px hover:translate-y-px hover:shadow-none transition-all"
          >
            <Pencil className="h-4 w-4" />
          </Button>
        ) : (
          <Button className="bg-main border-2 border-black shadow-shadow h-12 px-6 text-lg font-heading uppercase">
            <Plus className="mr-2" /> Add Product
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px] border-4 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] rounded-none">
        <form
          onSubmit={(e) => {
            e.preventDefault();

            const formData = new FormData(e.currentTarget);

            const data = {
              name: String(formData.get("name")),
              price: Number(formData.get("price")),
              quantity: Number(formData.get("quantity")),
              currency: String(formData.get("currency")),
              description: String(formData.get("description") || ""),
              image_url: String(formData.get("image_url") || ""),
            };

            const method = isEditing ? "PATCH" : "POST";

            const request = fetch("/api/products", {
              method,
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(
                isEditing ? { ...data, id: product?.id } : data,
              ),
            }).then(async (res) => {
              if (!res.ok) throw new Error("Request failed");
              return res.json();
            });

            toast.promise(request, {
              loading: isEditing
                ? "Updating product..."
                : "Creating product...",
              success: (result) => {
                onProductSaved(result);
                setIsOpen(false);
                return isEditing
                  ? "Product updated successfully!"
                  : "Product created successfully!";
              },
              error: isEditing
                ? "Failed to update product."
                : "Failed to create product.",
            });
          }}
        >
          <DialogHeader>
            <DialogTitle className="text-3xl font-heading uppercase">
              {isEditing ? "Update Item" : "New Weird Stuff"}
            </DialogTitle>
            <DialogDescription className="font-bold opacity-70 italic text-black">
              {isEditing
                ? `Modifying product ID: ${product.id}`
                : "Fill the voids to manifest a new product."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 py-6">
            {/* NAME */}
            <div className="grid gap-2">
              <Label htmlFor="name" className="font-black uppercase">
                Product Name
              </Label>
              <Input
                id="name"
                name="name"
                defaultValue={product?.name}
                className="border-2 border-black rounded-none focus-visible:ring-0 focus-visible:border-main bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* PRICE */}
              <div className="grid gap-2">
                <Label htmlFor="price" className="font-black uppercase">
                  Price (INR)
                </Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  defaultValue={product?.price}
                  className="border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                  required
                />
              </div>

              {/* currency */}
              <div className="grid gap-2">
                <Label htmlFor="currency" className="font-black uppercase">
                  Currency
                </Label>
                <select
                  id="currency"
                  name="currency"
                  defaultValue={product?.currency ?? "INR"}
                  className="border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                >
                  <option value="INR">INR</option>
                  <option value="USD">USD</option>
                </select>
              </div>
            </div>
            {/* STOCK */}
            <div className="grid gap-2">
              <Label htmlFor="quantity" className="font-black uppercase">
                Stock Count
              </Label>
              <Input
                id="quantity"
                name="quantity"
                type="number"
                defaultValue={product?.quantity}
                className="border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                required
              />
            </div>

            {/* IMAGE UPLOAD PLACEHOLDER */}
            <div className="grid gap-2">
              <Label className="font-black uppercase">Product Image</Label>
              <div className="border-4 border-dashed border-black p-8 bg-secondary-background flex flex-col items-center justify-center gap-2 group cursor-pointer hover:bg-main transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <ImagePlus className="w-10 h-10" />
                <span className="font-bold uppercase text-xs">
                  Cloudinary Upload Widget Placeholder
                </span>
                {product?.image_url && (
                  <span className="text-[10px] font-mono opacity-50 truncate w-full text-center">
                    Existing: {product.image_url.split("/").pop()}
                  </span>
                )}
              </div>
              <input
                type="hidden"
                name="image_url"
                defaultValue={product?.image_url}
              />
            </div>

            {/* DESCRIPTION */}
            <div className="grid gap-2">
              <Label htmlFor="description" className="font-black uppercase">
                Description (Use commas for bullet points)
              </Label>
              <Textarea
                id="description"
                name="description"
                defaultValue={
                  Array.isArray(product?.description)
                    ? product.description.join(", ")
                    : product?.description
                }
                className="border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] min-h-[100px]"
              />
            </div>
          </div>

          <DialogFooter className="gap-2">
            <DialogClose asChild>
              <Button
                type="button"
                variant="neutral"
                className="border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none translate-all"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-main border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all uppercase font-heading"
            >
              {isLoading
                ? "Saving..."
                : isEditing
                  ? "Save Changes"
                  : "Create Product"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductForm;
