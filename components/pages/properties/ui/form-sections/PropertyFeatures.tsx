import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Star, Ruler } from "lucide-react";
import { labels } from "../constants/labels";
import { TagInput } from "../form-components/TagInput";
import { UseFormReturn } from "react-hook-form";

interface PropertyFeaturesProps {
  form: UseFormReturn<any>;
}

export const PropertyFeatures = ({ form }: PropertyFeaturesProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField
        control={form.control}
        name="features"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              {labels.features}
            </FormLabel>
            <FormControl>
              <TagInput
                value={field.value}
                onChange={field.onChange}
                placeholder={labels.featuresPlaceholder}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="amenities"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <Ruler className="h-4 w-4" />
              {labels.amenities}
            </FormLabel>
            <FormControl>
              <TagInput
                value={field.value}
                onChange={field.onChange}
                placeholder={labels.amenitiesPlaceholder}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}; 