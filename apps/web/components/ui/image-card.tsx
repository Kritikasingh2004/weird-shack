"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

type Props = {
  imageUrl: string;
  caption?: string;
  className?: string;
  children?: React.ReactNode;
};

export default function ImageCard({
  imageUrl,
  caption,
  className,
  children,
}: Props) {
  const FALLBACK = "/noimage.png";

  // 1. Initialize state with the URL or the fallback if URL is empty
  const [src, setSrc] = useState<string>(
    imageUrl && imageUrl.trim() !== "" ? imageUrl : FALLBACK,
  );

  // 2. If the imageUrl prop changes (e.g., during sorting/filtering), update state
  useEffect(() => {
    setSrc(imageUrl && imageUrl.trim() !== "" ? imageUrl : FALLBACK);
  }, [imageUrl]);

  return (
    <figure
      className={cn(
        "w-full overflow-hidden rounded-base border-2 border-border bg-secondary-background font-base shadow-shadow",
        className,
      )}
    >
      <img
        className="w-full aspect-4/3"
        src={src}
        alt={caption || "product image"}
        onError={() => setSrc(FALLBACK)}
      />
      {(caption || children) && (
        <figcaption className="border-t-2 text-main-foreground border-border p-4">
          {children || caption}
        </figcaption>
      )}
    </figure>
  );
}
