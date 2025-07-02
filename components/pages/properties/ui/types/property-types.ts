import * as z from "zod";

// Property Types and Status Enums
export enum PropertyType {
  APARTMENT = "APARTMENT",
  VILLA = "VILLA", 
  TOWNHOUSE = "TOWNHOUSE",
  PENTHOUSE = "PENTHOUSE",
  STUDIO = "STUDIO",
  OFFICE = "OFFICE",
  SHOP = "SHOP",
  WAREHOUSE = "WAREHOUSE",
  LAND = "LAND",
  BUILDING = "BUILDING"
}

export enum PropertyStatus {
  AVAILABLE = "AVAILABLE",
  SOLD = "SOLD",
  RENTED = "RENTED", 
  RESERVED = "RESERVED",
  OFF_MARKET = "OFF_MARKET"
}

// Form Schema
export const propertyFormSchema = z.object({
  title: z.string().min(1, "عنوان العقار مطلوب"),
  description: z.string().min(1, "وصف العقار مطلوب"),
  price: z.union([
    z.string().transform(val => Number(val.replace(/[^\d.-]/g, "")) || 0),
    z.number(),
  ]).transform(val => Number(val) || 0),
  currency: z.string().default("SAR"),
  type: z.nativeEnum(PropertyType).default(PropertyType.APARTMENT),
  status: z.nativeEnum(PropertyStatus).default(PropertyStatus.AVAILABLE),
  bedrooms: z.union([
    z.string().transform(val => Number(val.replace(/[^\d.-]/g, "")) || null),
    z.number(),
    z.null(),
  ]).optional().nullable(),
  bathrooms: z.union([
    z.string().transform(val => Number(val.replace(/[^\d.-]/g, "")) || null),
    z.number(),
    z.null(),
  ]).optional().nullable(),
  area: z.union([
    z.string().transform(val => Number(val.replace(/[^\d.-]/g, "")) || null),
    z.number(),
    z.null(),
  ]).optional().nullable(),
  location: z.string().min(1, "موقع العقار مطلوب"),
  address: z.string().min(1, "عنوان العقار مطلوب"),
  city: z.string().min(1, "المدينة مطلوبة"),
  country: z.string().default("السعودية"),
  images: z.array(z.string()).default([]),
  features: z.array(z.string()).default([]),
  amenities: z.array(z.string()).default([]),
  yearBuilt: z.union([
    z.string().transform(val => Number(val.replace(/[^\d.-]/g, "")) || null),
    z.number(),
    z.null(),
  ]).optional().nullable(),
  parking: z.union([
    z.string().transform(val => Number(val.replace(/[^\d.-]/g, "")) || null),
    z.number(),
    z.null(),
  ]).optional().nullable(),
  furnished: z.boolean().default(false),
  petFriendly: z.boolean().default(false),
  contactInfo: z.string().min(1, "معلومات الاتصال مطلوبة"),
  isFeatured: z.boolean().default(false),
  isActive: z.boolean().default(true),
  utilities: z.string().optional(),
  agentId: z.string().optional(),
  latitude: z.union([
    z.string().transform(val => Number(val.replace(/[^\d.-]/g, "")) || null),
    z.number(),
    z.null(),
  ]).optional().nullable(),
  longitude: z.union([
    z.string().transform(val => Number(val.replace(/[^\d.-]/g, "")) || null),
    z.number(),
    z.null(),
  ]).optional().nullable(),
});

export type PropertyFormData = z.infer<typeof propertyFormSchema>;

// Component Props Types
export interface ToastProps {
  message: string;
  type: "success" | "error" | "info";
  onClose: () => void;
}

export interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  className?: string;
}

export interface ImageUploaderProps {
  images: string[];
  onImagesChange: (newImages: string[]) => void;
  maxFiles?: number;
}

export interface NumberInputProps {
  value: number | undefined;
  onChange: (value: number | undefined) => void;
  min?: number;
  max?: number;
  placeholder?: string;
  className?: string;
} 