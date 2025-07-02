import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Square, Calendar, Car } from "lucide-react";
import { labels } from "../constants/labels";
import { NumberInput } from "../form-components/NumberInput";
import { DatePicker } from "../form-components/DatePicker";
import { UseFormReturn } from "react-hook-form";

interface AdditionalDetailsProps {
  form: UseFormReturn<any>;
}

export const AdditionalDetails = ({ form }: AdditionalDetailsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <FormField
        control={form.control}
        name="area"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <Square className="h-4 w-4" />
              {labels.area}
            </FormLabel>
            <FormControl>
              <NumberInput
                value={field.value}
                onChange={field.onChange}
                placeholder="0"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="yearBuilt"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {labels.yearBuilt}
            </FormLabel>
            <FormControl>
              <DatePicker
                value={field.value ? new Date(field.value, 0, 1) : undefined}
                onChange={(date) => field.onChange(date?.getFullYear())}
                minYear={1800}
                maxYear={new Date().getFullYear()}
                placeholder={new Date().getFullYear().toString()}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="parking"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <Car className="h-4 w-4" />
              {labels.parkingSpaces}
            </FormLabel>
            <FormControl>
              <NumberInput
                value={field.value}
                onChange={field.onChange}
                placeholder="0"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}; 