import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { DollarSign, Bed, Bath } from "lucide-react";
import { labels } from "../constants/labels";
import { NumberInput } from "../form-components/NumberInput";
import { UseFormReturn } from "react-hook-form";

interface PropertyDetailsProps {
  form: UseFormReturn<any>;
}

export const PropertyDetails = ({ form }: PropertyDetailsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <FormField
        control={form.control}
        name="price"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              {labels.price} ({labels.currency})
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
        name="bedrooms"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <Bed className="h-4 w-4" />
              {labels.bedrooms}
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
        name="bathrooms"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <Bath className="h-4 w-4" />
              {labels.bathrooms}
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