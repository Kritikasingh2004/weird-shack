import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "@/components/ProductGrid";
import ProductTable from "@/components/ProductTable";
import { toast } from "sonner";

export default async function AdminDashboard() {
  const res = await fetch("http://localhost:8000/products");

  if (!res.ok) {
    toast.error(`Failed to fetch products: ${res.statusText}`);
    console.error("Failed to fetch product:", res.statusText);
    return <div>Error loading products.</div>;
  }

  const products: Product[] = await res.json();

  return (
    <div className="space-y-6">
      <ProductTable initialProducts={products} />

      <div className="flex items-center justify-between pt-4">
        <p className="text-sm font-bold uppercase italic">
          Showing 1-{products.length} of {products.length} items
        </p>
        <div className="flex gap-4">
          <Button className="bg-secondary-background text-ring">
            <ChevronLeft className="mr-2 h-4 w-4" /> Prev
          </Button>
          <Button className="bg-secondary-background text-ring">
            Next <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
