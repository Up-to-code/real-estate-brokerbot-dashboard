// Represents a fully fetched property from the backend
export interface Property {
  id: string;
  title: string;
  title_ar?: string;
  description: string;
  description_ar?: string;
  price: number;
  currency: string;
  type: string;
  type_ar?: string;
  status: string;
  status_ar?: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  location: string;
  location_ar?: string;
  address: string;
  address_ar?: string;
  city: string;
  city_ar?: string;
  country: string;
  country_ar?: string;
  latitude: number | null;
  longitude: number | null;
  images: string[];
  features: string[];
  features_ar?: string[];
  amenities: string[];
  amenities_ar?: string[];
  yearBuilt: number | null;
  parking: number | null;
  furnished: boolean;
  petFriendly: boolean;
  utilities: string | null;
  utilities_ar?: string | null;
  contactInfo: string | null;
  contactInfo_ar?: string | null;
  agentId: string | null;
  isActive: boolean;
  isFeatured: boolean;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}

// For contact person submitting a property
export interface PropertyContact {
  name: string;
  phone: string;
  email: string;
}

// For form input before sending to API (all as strings initially)
export interface PropertyFormData {
  title: string;
  description: string;
  price: string;
  city: string;
  address: string;
  bedrooms: string;
  bathrooms: string;
  area: string;
  type: string;
  status: string;
  contact: PropertyContact;
}

// Transformed/validated data before submitting to API
export interface PropertyData extends Omit<PropertyFormData, 'price' | 'bedrooms' | 'bathrooms' | 'area'> {
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  amenities: string[];
  images: string[];
}

// For UI image preview before upload
export interface ImagePreview {
  file?: File;
  url: string;
  id: string;
}

// For dropdown options
export interface PropertyOption {
  value: string;
  label: string;
}

export interface PropertyHeaderProps {}

export interface PropertyFiltersProps {
  searchTerm: string;
  filterStatus: string;
  sortBy: string;
  sortOrder: "asc" | "desc";
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onSortByChange: (value: string) => void;
  onSortOrderChange: (value: "asc" | "desc") => void;
  locale?: "en" | "ar";
}

export interface PropertyGridProps {
  loading: boolean;
  properties: Property[] | undefined;
  onDelete: (id: string) => void;
  onView: (property: Property) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  locale?: "en" | "ar";
}

export interface EmptyStateProps {
  hasFilters: boolean;
  onClearFilters: () => void;
  locale?: "en" | "ar";
}

export interface DeleteConfirmationDialogProps {
  property: Property | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  locale?: "en" | "ar";
}

export interface ViewPropertyDialogProps {
  property: Property | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  locale?: "en" | "ar";
}
