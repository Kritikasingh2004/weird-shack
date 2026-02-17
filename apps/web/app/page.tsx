import ProductGrid from "@/components/ProductGrid";

export default async function Home() {
  const res = await fetch(`http://localhost:8000/products`, {
    cache: "no-store",
  });

  const products = await res.json();

  return (
    <div className="h-screen">
      <h1 className="text-5xl font-heading mt-20 mb-7 px-4">
        Welcome to Weird Shack
      </h1>
      <ProductGrid products={products} />
    </div>
  );
}
