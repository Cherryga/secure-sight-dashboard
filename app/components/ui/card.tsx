// components/ui/card.tsx
import { cn } from "@/lib/utils"; // If you don't have `cn`, you can use simple className concatenation

import React from "react";

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("rounded-2xl border bg-black text-white shadow-md p-4", className)} {...props} />;
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-2", className)} {...props} />;
}
