"use client";

import * as React from "react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface DatePickerProps {
  value?: Date;
  onChange: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
  minYear?: number;
  maxYear?: number;
}

export function DatePicker({
  value,
  onChange,
  placeholder = "Select date",
  className,
  minYear = 1800,
  maxYear = new Date().getFullYear(),
}: DatePickerProps) {
  const fromDate = new Date(minYear, 0, 1);
  const toDate = new Date(maxYear, 11, 31);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-right font-normal",
            !value && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="ml-2 h-4 w-4" />
          {value ? format(value, "yyyy", { locale: ar }) : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          fromDate={fromDate}
          toDate={toDate}
          initialFocus
          captionLayout="dropdown-buttons"
          showOutsideDays={false}
          defaultMonth={value || new Date()}
        />
      </PopoverContent>
    </Popover>
  );
} 