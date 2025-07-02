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
import axios from "axios";

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

const PropertyForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const form = useForm<PropertyFormData>({
    resolver: zodResolver(propertyFormSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      currency: "SAR",
      type: PropertyType.APARTMENT,
      status: PropertyStatus.AVAILABLE,
      location: "",
      address: "",
      city: "",
      country: "السعودية",
      images: [],
      features: [],
      amenities: [],
      bedrooms: null,
      bathrooms: null,
      area: null,
      yearBuilt: null,
      parking: null,
      furnished: false,
      petFriendly: false,
      isFeatured: false,
      contactInfo: "",
      isActive: true,
    },
  });

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
      
      // Convert all number fields from string to number
      const propertyInput = {
        ...data,
        price: Number(data.price) || 0,
        bedrooms: data.bedrooms ? Number(data.bedrooms) : null,
        bathrooms: data.bathrooms ? Number(data.bathrooms) : null,
        area: data.area ? Number(data.area) : null,
        yearBuilt: data.yearBuilt ? Number(data.yearBuilt) : null,
        parking: data.parking ? Number(data.parking) : null,
        images: uploadedImages,
        features: data.features || [],
        amenities: data.amenities || [],
        type: data.type?.toUpperCase() as PropertyType || PropertyType.APARTMENT,
        status: data.status || PropertyStatus.AVAILABLE,
        country: data.country || "السعودية",
        isActive: true,
      };

      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/properties`, propertyInput);
      
      if (response.data) {
        showToast(labels.propertyCreatedSuccess, "success");
        form.reset();
        setUploadedImages([]);
      }
    } catch (error) {
      console.error("Error creating property:", error);
      showToast(labels.errorCreatingProperty, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const { errors, isSubmitting } = form.formState;
  const hasErrors = Object.keys(errors).length > 0;

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
            {labels.addNewProperty}
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

              <Card className="p-6">
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-xl">
                    {labels.propertyImages}
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-0 pb-0">
                  <FileUploadDirectUploadDemo onUploadComplete={handleImageUpload} />
                  
                  {/* Image Gallery */}
                  {uploadedImages.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                      {uploadedImages.map((url, index) => (
                        <div key={index} className="relative group">
                          <img 
                            src={url} 
                            alt={`Property image ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {errors.images && (
                    <p className="text-red-500 text-sm mt-2">{errors.images.message}</p>
                  )}
                </CardContent>
              </Card>

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
                      <span className="text-xl">{labels.createProperty}</span>
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

export default PropertyForm;
