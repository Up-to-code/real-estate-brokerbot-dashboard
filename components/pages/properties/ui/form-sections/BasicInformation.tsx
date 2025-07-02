import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tag, Building, FileText } from "lucide-react";
import { labels } from "../constants/labels";
import { PropertyType } from "../types/property-types";
import { UseFormReturn } from "react-hook-form";

interface BasicInformationProps {
  form: UseFormReturn<any>;
}

export const BasicInformation = ({ form }: BasicInformationProps) => {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <Tag className="h-4 w-4" />
              {labels.propertyTitle}
            </FormLabel>
            <FormControl>
              <Input 
                placeholder="شقة جميلة بغرفتي نوم..." 
                {...field} 
                className="text-right"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              {labels.description}
            </FormLabel>
            <FormDescription className="text-right text-sm text-muted-foreground">
              اكتب وصفاً تفصيلياً للعقار يشمل:
            </FormDescription>
            <FormControl>
              <Textarea 
                placeholder={`- موقع العقار وأهم المعالم القريبة
- تفاصيل التشطيب والديكور
- المميزات الخاصة (مثل: شرفة، حديقة، موقف سيارات)
- المرافق المتوفرة (مثل: مسبح، صالة رياضية، حراسة)
- حالة العقار وسنة البناء
- تفاصيل إضافية مهمة للمشتري/المستأجر`}
                {...field} 
                className="text-right min-h-[200px] leading-relaxed"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="type"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              {labels.propertyType}
            </FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={labels.selectPropertyType} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {Object.values(PropertyType).map((type) => (
                  <SelectItem key={type} value={type}>
                    {labels[type as keyof typeof labels]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}; 