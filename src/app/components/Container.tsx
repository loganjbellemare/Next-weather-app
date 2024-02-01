import { cn } from "@/utils/cn";
import React from "react";

export default function Container(props: React.HTMLProps<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn(
        "w-full bg-white border py-4 rounded-xl flex gap-4 shadow-sm",
        props.className
      )}
    />
  );
}
