"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ProductForm from "./forms/CreateProduct";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { Product } from "./ProductGrid";
import { useState } from "react";

const ProductTable = ({ initialProducts }: { initialProducts: Product[] }) => {
  const [products, setProducts] = useState(initialProducts);

  const handleProductSaved = (updatedProduct: Product) => {
    setProducts((prev) => {
      const exists = prev.find((p) => p.id === updatedProduct.id);

      if (exists) {
        return prev.map((p) =>
          p.id === updatedProduct.id ? updatedProduct : p,
        );
      }

      return [...prev, updatedProduct];
    });
  };

  const handleDelete = () => {
    // Implement delete functionality here
  };

  return (
    <>
      <header className="flex justify-between items-end border-b-4 border-black pb-6">
        <div>
          <h1 className="text-5xl font-heading uppercase">Inventory</h1>
          <p className="font-bold opacity-60 ">Manage the weirdness levels.</p>
        </div>

        <ProductForm onProductSaved={handleProductSaved} />
      </header>

      <div className="border-4 border-black bg-white shadow-shadow overflow-hidden">
        <Table>
          <TableHeader className="bg-secondary-background border-b-4 border-black">
            <TableRow>
              <TableHead className="font-black uppercase">Product</TableHead>
              <TableHead className="font-black uppercase text-center">
                Price
              </TableHead>
              <TableHead className="font-black uppercase text-center">
                Stock
              </TableHead>
              <TableHead className="font-black uppercase text-center">
                Quantity Sold
              </TableHead>
              <TableHead className="font-black uppercase text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow
                key={product.id}
                className="border-b-2 border-border/10 hover:bg-main/5 transition-colors"
              >
                <TableCell className="font-bold">{product.name}</TableCell>
                <TableCell className="text-center">
                  {product.currency} {product.price}
                </TableCell>
                <TableCell className="text-center ">
                  {product.quantity}
                </TableCell>
                <TableCell className="text-center ">
                  {product.quantity_sold}
                </TableCell>

                {/* EDIT PRODUCT FORM*/}
                <TableCell className="text-right flex justify-end gap-2">
                  <ProductForm
                    product={product}
                    onProductSaved={handleProductSaved}
                  />

                  <Button
                    size="icon"
                    onClick={handleDelete}
                    className="border-2 border-black bg-red-500 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-px hover:translate-y-px hover:shadow-none transition-all"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default ProductTable;
