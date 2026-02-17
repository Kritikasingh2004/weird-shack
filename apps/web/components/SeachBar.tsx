"use client";

import { Search, Loader2 } from "lucide-react";

import * as React from "react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Product } from "./ProductGrid";
import Link from "next/link";

const SeachBar = () => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const [products, setProducts] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const baseUrl = process.env.API_URL || "http://localhost:8000";

  React.useEffect(() => {
    if (!baseUrl) return;

    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${baseUrl}/products`, {
          cache: "no-store",
        });
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [baseUrl]);

  const searchItems = products.map((product: Product) => ({
    label: product.name,
    value: product.id,
  }));

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            role="combobox"
            aria-expanded={open}
            className="w-[250px] bg-secondary-background flex justify-between align-center font-semibold mx-2 text-foreground"
          >
            <span className="flex">
              <Search className=" h-11 w-11 mr-2" /> Search
            </span>
            <kbd className="bg-main text-main-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded-base border-2 px-1.5 font-mono text-[10px] font-heading select-none">
              <span className="text-xs">⌘</span>J
            </kbd>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-(--radix-popover-trigger-width) border-0 p-0">
          <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput placeholder="Search Stuff..." />
            <CommandList className="p-1">
              {isLoading ? (
                <div className="flex items-center justify-center p-6 text-sm font-bold italic">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  GATHERING WEIRD STUFF...
                </div>
              ) : (
                <>
                  <CommandEmpty>Hmmm... No Werid stuff found</CommandEmpty>
                  <CommandGroup>
                    {searchItems.map((item) => (
                      <Link href={"/products/" + item.value} key={item.value}>
                        <CommandItem value={item.label}>
                          {item.label}
                        </CommandItem>
                      </Link>
                    ))}
                  </CommandGroup>
                </>
              )}
            </CommandList>
          </CommandDialog>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default SeachBar;
