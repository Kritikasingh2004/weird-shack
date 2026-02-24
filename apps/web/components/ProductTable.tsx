"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import ProductForm from "./forms/CreateProduct";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { Product } from "./ProductGrid";
import { useState } from "react";
import { toast } from "sonner";

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

  const handleProductDeleted = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleDelete = (id: string) => {
    const deletePromise = fetch(`/api/products/${id}`, {
      method: "DELETE",
    }).then((res) => {
      if (!res.ok) throw new Error("Delete failed");
      return res;
    });

    toast.promise(deletePromise, {
      loading: "Deleting product...",
      success: () => {
        handleProductDeleted(id);
        return "Product deleted successfully";
      },
      error: "Failed to delete product",
    });
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

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        size="icon"
                        className="border-2 border-black bg-red-500 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-px hover:translate-y-px hover:shadow-none transition-all"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your product and remove your data from our
                          servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-red-500"
                          onClick={() => handleDelete(product.id)}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
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
