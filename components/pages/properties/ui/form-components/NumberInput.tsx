"use client";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { NumberInputProps } from "../types/property-types";

export const NumberInput = ({ value, onChange, min = 0, max = Infinity, placeholder, className }: NumberInputProps) => {
  return (
    <Input
      type="number"
      value={value === undefined || value === null ? "" : value}
      onChange={(e) => {
        const numStr = e.target.value;
        if (numStr === "") {
          onChange(undefined); // Allow clearing the input
        } else {
          const num = parseFloat(numStr);
          if (!isNaN(num) && num >= min && num <= max) {
            onChange(num);
          }
        }
      }}
      min={min}
      max={max}
      placeholder={placeholder}
      className={cn("text-right", className)}
    />
  );
}; 