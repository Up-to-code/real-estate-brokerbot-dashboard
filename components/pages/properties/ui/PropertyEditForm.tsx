"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Home, Building, Loader2, Phone, AlertCircle, X, ArrowLeft } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { usePropertyStore } from "@/store/property-store";

// Import types and components
import { PropertyFormData, propertyFormSchema, PropertyType, PropertyStatus } from "./types/property-types";
import { labels } from "./constants/labels";
import { Toast } from "./form-components/Toast";
import { FileUploadDirectUploadDemo } from "./form-sections/FileUploadDirectUploadDemo";

// Import form sections
import {
  BasicInformation,
  PropertyDetails,
  LocationInfo,
  AdditionalDetails,
  PropertyFeatures,
  PropertyOptions,
} from "./form-sections";

interface PropertyEditFormProps {
  propertyId: string;
}

const PropertyEditForm = ({ propertyId }: PropertyEditFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const { fetchPropertyById, editProperty } = usePropertyStore();

  const form = useForm<PropertyFormData>({
    resolver: zodResolver(propertyFormSchema),
    mode: "onChange",
    defaultValues: {
      features: [],
      amenities: [],
      images: [],
    }
  });

  useEffect(() => {
    const loadProperty = async () => {
      try {
        setIsLoading(true);
        await fetchPropertyById(propertyId);
        const property = usePropertyStore.getState().currentProperty;
        
        if (property) {
          form.reset({
            title: property.title || "",
            description: property.description || "",
            price: property.price || 0,
            currency: property.currency || "SAR",
            type: property.type as PropertyType || PropertyType.APARTMENT,
            status: property.status as PropertyStatus || PropertyStatus.AVAILABLE,
            location: property.location || "",
            address: property.address || "",
            city: property.city || "",
            country: property.country || "السعودية",
            bedrooms: property.bedrooms || null,
            bathrooms: property.bathrooms || null,
            area: property.area || null,
            yearBuilt: property.yearBuilt || null,
            parking: property.parking || null,
            furnished: property.furnished || false,
            petFriendly: property.petFriendly || false,
            isFeatured: property.isFeatured || false,
            contactInfo: property.contactInfo || "",
            isActive: property.isActive ?? true,
            features: property.features || [],
            amenities: property.amenities || [],
            images: property.images || [],
            utilities: property.utilities || "",
            latitude: property.latitude === null ? undefined : Number(property.latitude),
            longitude: property.longitude === null ? undefined : Number(property.longitude),
          });

          setUploadedImages(property.images || []);
        }
      } catch (error) {
        console.error("Error fetching property:", error);
        showToast(labels.errorFetchingProperty, "error");
      } finally {
        setIsLoading(false);
      }
    };

    loadProperty();
  }, [propertyId, form, fetchPropertyById]);

  // Update form images field when uploadedImages changes
  useEffect(() => {
    form.setValue('images', uploadedImages, { 
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  }, [uploadedImages, form]);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleImageUpload = (urls: string[]) => {
    setUploadedImages(prev => [...prev, ...urls]);
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: PropertyFormData) => {
    try {
      setIsLoading(true);
      
      const propertyInput = {
        ...data,
        price: Number(data.price) || 0,
        bedrooms: data.bedrooms === null ? undefined : Number(data.bedrooms),
        bathrooms: data.bathrooms === null ? undefined : Number(data.bathrooms),
        area: data.area === null ? undefined : Number(data.area),
        yearBuilt: data.yearBuilt === null ? undefined : Number(data.yearBuilt),
        parking: data.parking === null ? undefined : Number(data.parking),
        latitude: data.latitude === null ? undefined : Number(data.latitude),
        longitude: data.longitude === null ? undefined : Number(data.longitude),
        images: uploadedImages,
        features: data.features || [],
        amenities: data.amenities || [],
        type: data.type?.toUpperCase() as PropertyType || PropertyType.APARTMENT,
        status: data.status || PropertyStatus.AVAILABLE,
        country: data.country || "السعودية",
        isActive: true,
      };

      const updatedProperty = await editProperty(propertyId, propertyInput);
      
      if (updatedProperty) {
        showToast(labels.propertyUpdatedSuccess, "success");
        router.push(`/properties/${propertyId}`);
      }
    } catch (error) {
      console.error("Error updating property:", error);
      showToast(labels.errorUpdatingProperty, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const { errors, isSubmitting } = form.formState;
  const hasErrors = Object.keys(errors).length > 0;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 font-arabic" dir="rtl">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {hasErrors && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="space-y-2">
            <p>يرجى إكمال الحقول التالية:</p>
            <ul className="list-disc list-inside">
              {Object.entries(errors).map(([field, error]) => (
                <li key={field}>{error?.message || labels[field as keyof typeof labels]}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Home className="h-7 w-7 text-primary" />
            {labels.editProperty}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <BasicInformation form={form} />
              <PropertyDetails form={form} />
              <LocationInfo form={form} />
              <AdditionalDetails form={form} />
              <PropertyFeatures form={form} />
              <PropertyOptions form={form} />

              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="images"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{labels.propertyImages}</FormLabel>
                      <FormControl>
                        <FileUploadDirectUploadDemo
                          onUploadComplete={handleImageUpload}
                          existingImages={uploadedImages}
                          onRemoveImage={removeImage}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contactInfo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        {labels.contactInfo}
                      </FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder={labels.contactInfoPlaceholder}
                          {...field} 
                          className={`text-right ${errors.contactInfo ? 'border-red-500' : ''}`}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="sticky bottom-0 bg-white p-4 shadow-lg rounded-lg border mt-8">
                <Button 
                  type="submit" 
                  size="lg"
                  className="w-full h-14 text-lg transition-all duration-200 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700"
                  disabled={isLoading || isSubmitting}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-6 w-6 animate-spin" />
                      <span className="text-xl">{labels.saving}</span>
                    </>
                  ) : (
                    <>
                      <Building className="h-6 w-6" />
                      <span className="text-xl">{labels.updateProperty}</span>
                      <ArrowLeft className="h-6 w-6 mr-2" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PropertyEditForm; 