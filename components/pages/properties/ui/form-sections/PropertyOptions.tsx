import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { labels } from "../constants/labels";
import { UseFormReturn } from "react-hook-form";

interface PropertyOptionsProps {
  form: UseFormReturn<any>;
}

export const PropertyOptions = ({ form }: PropertyOptionsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <FormField
        control={form.control}
        name="furnished"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm transition-all hover:shadow-md">
            <div className="space-y-0.5">
              <FormLabel className="text-base">{labels.furnished}</FormLabel>
              <div className="text-sm text-muted-foreground">
                {labels.furnishedDescription}
              </div>
            </div>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
                aria-label={labels.furnished}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="petFriendly"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm transition-all hover:shadow-md">
            <div className="space-y-0.5">
              <FormLabel className="text-base">{labels.petFriendly}</FormLabel>
              <div className="text-sm text-muted-foreground">
                {labels.petFriendlyDescription}
              </div>
            </div>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
                aria-label={labels.petFriendly}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="isFeatured"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm transition-all hover:shadow-md">
            <div className="space-y-0.5">
              <FormLabel className="text-base">{labels.featured}</FormLabel>
              <div className="text-sm text-muted-foreground">
                {labels.featuredDescription}
              </div>
            </div>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
                aria-label={labels.featured}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
}; 