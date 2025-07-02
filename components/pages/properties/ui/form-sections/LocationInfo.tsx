import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MapPin, Home, Globe } from "lucide-react";
import { labels } from "../constants/labels";
import { UseFormReturn } from "react-hook-form";

interface LocationInfoProps {
  form: UseFormReturn<any>;
}

export const LocationInfo = ({ form }: LocationInfoProps) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {labels.address}
              </FormLabel>
              <FormControl>
                <Input placeholder={labels.addressPlaceholder} {...field} className="text-right" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                {labels.city}
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder={labels.cityPlaceholder} 
                  {...field} 
                  className="text-right"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="location"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              {labels.location}
            </FormLabel>
            <FormControl>
              <Input 
                placeholder={labels.locationPlaceholder} 
                {...field} 
                className="text-right"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}; 