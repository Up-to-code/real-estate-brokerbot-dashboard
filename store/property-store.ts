// store/propertyStore.ts
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';

// Types
export enum PropertyType {
  APARTMENT = 'APARTMENT',
  VILLA = 'VILLA',
  TOWNHOUSE = 'TOWNHOUSE',
  PENTHOUSE = 'PENTHOUSE',
  STUDIO = 'STUDIO',
  OFFICE = 'OFFICE',
  SHOP = 'SHOP',
  WAREHOUSE = 'WAREHOUSE',
  LAND = 'LAND',
  BUILDING = 'BUILDING'
}

export enum PropertyStatus {
  AVAILABLE = 'AVAILABLE',
  SOLD = 'SOLD',
  RENTED = 'RENTED',
  RESERVED = 'RESERVED',
  OFF_MARKET = 'OFF_MARKET'
}

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  type: PropertyType;
  status: PropertyStatus;
  bedrooms: number;
  bathrooms: number;
  area: number;
  location: string;
  address: string;
  city: string;
  country: string;
  latitude?: number;
  longitude?: number;
  images: string[];
  features: string[];
  amenities: string[];
  yearBuilt?: number;
  parking?: number;
  furnished: boolean;
  petFriendly: boolean;
  utilities?: string;
  contactInfo?: string;
  agentId?: string;
  isActive: boolean;
  isFeatured: boolean;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface PropertyFilters {
  type?: PropertyType;
  status?: PropertyStatus;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  city?: string;
  furnished?: boolean;
  petFriendly?: boolean;
  isFeatured?: boolean;
}

export interface PropertyFormData {
  title: string;
  description: string;
  price: number;
  currency: string;
  type: PropertyType;
  status: PropertyStatus;
  bedrooms: number;
  bathrooms: number;
  area: number;
  location: string;
  address: string;
  city: string;
  country: string;
  latitude?: number;
  longitude?: number;
  images: string[];
  features: string[];
  amenities: string[];
  yearBuilt?: number;
  parking?: number;
  furnished: boolean;
  petFriendly: boolean;
  utilities?: string;
  contactInfo?: string;
  agentId?: string;
  isActive: boolean;
  isFeatured: boolean;
}

interface PropertyState {
  properties: Property[];
  currentProperty: Property | null;
  featuredProperties: Property[];
  loading: boolean;
  error: string | null;
  filters: PropertyFilters;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

interface PropertyActions {
  fetchProperties: (filters?: PropertyFilters, page?: number, limit?: number) => Promise<void>;
  fetchPropertyById: (id: string) => Promise<void>;
  fetchFeaturedProperties: () => Promise<void>;
  createProperty: (data: PropertyFormData) => Promise<Property | null>;
  editProperty: (id: string, data: Partial<PropertyFormData>) => Promise<Property | null>;
  deleteProperty: (id: string) => Promise<boolean>;
  toggleFeatured: (id: string) => Promise<void>;
  incrementViewCount: (id: string) => Promise<void>;
  searchProperties: (query: string, filters?: PropertyFilters) => Promise<void>;
  setFilters: (filters: PropertyFilters) => void;
  clearFilters: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  reset: () => void;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

const initialState: PropertyState = {
  properties: [],
  currentProperty: null,
  featuredProperties: [],
  loading: false,
  error: null,
  filters: {},
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },
};

const apiRequest = async (url: string, options: RequestInit = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

export const usePropertyStore = create<PropertyState & PropertyActions>()(
  devtools(
    (set, get) => ({
      ...initialState,

      fetchProperties: async (filters = {}, page = 1, limit = 10) => {
        if (get().loading) return;
        set({ loading: true, error: null });
        try {
          const queryParams = new URLSearchParams({
            page: String(page),
            limit: String(limit),
            ...Object.entries(filters)
              .filter(([_, value]) => value != null && value !== '')
              .reduce((acc, [key, value]) => ({ ...acc, [key]: String(value) }), {})
          });

          const res = await apiRequest(`/properties?${queryParams}`);
          set({
            properties: res.data.properties,
            pagination: res.data.pagination,
            filters,
            loading: false,
          });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to fetch properties',
            loading: false 
          });
        }
      },

      fetchPropertyById: async (id: string) => {
        if (get().loading) return;
        set({ loading: true, error: null });
        try {
          const res = await apiRequest(`/properties/${id}`);
          set({ currentProperty: res.data, loading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to fetch property',
            loading: false 
          });
        }
      },

      fetchFeaturedProperties: async () => {
        if (get().loading) return;
        try {
          const res = await apiRequest('/properties/featured');
          set({ featuredProperties: res.data.properties });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to fetch featured properties'
          });
        }
      },

      createProperty: async (data: PropertyFormData) => {
        if (get().loading) return null;
        set({ loading: true, error: null });
        try {
          const res = await apiRequest('/properties', {
            method: 'POST',
            body: JSON.stringify(data),
          });
          const newProperty = res.data;
          set(state => ({ 
            properties: [newProperty, ...state.properties],
            loading: false 
          }));
          return newProperty;
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to create property',
            loading: false 
          });
          return null;
        }
      },

      editProperty: async (id: string, data: Partial<PropertyFormData>) => {
        if (get().loading) return null;
        set({ loading: true, error: null });
        try {
          const res = await apiRequest(`/properties/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
          });
          const updated = res.data;
          set(state => ({
            properties: state.properties.map(p => (p.id === id ? updated : p)),
            currentProperty: state.currentProperty?.id === id ? updated : state.currentProperty,
            loading: false,
          }));
          return updated;
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to update property',
            loading: false 
          });
          return null;
        }
      },

      deleteProperty: async (id: string) => {
        if (get().loading) return false;
        set({ loading: true, error: null });
        try {
          await apiRequest(`/properties/${id}`, { method: 'DELETE' });
          set(state => ({
            properties: state.properties.filter(p => p.id !== id),
            currentProperty: state.currentProperty?.id === id ? null : state.currentProperty,
            loading: false,
          }));
          return true;
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to delete property',
            loading: false 
          });
          return false;
        }
      },

      toggleFeatured: async (id: string) => {
        try {
          const res = await apiRequest(`/properties/${id}/toggle-featured`, { method: 'PATCH' });
          const updated = res.data;
          set(state => ({
            properties: state.properties.map(p => (p.id === id ? updated : p)),
            currentProperty: state.currentProperty?.id === id ? updated : state.currentProperty,
          }));
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to toggle featured status'
          });
        }
      },

      incrementViewCount: async (id: string) => {
        try {
          await apiRequest(`/properties/${id}/view`, { method: 'PATCH' });
          set(state => ({
            properties: state.properties.map(p => 
              p.id === id ? { ...p, viewCount: p.viewCount + 1 } : p
            ),
            currentProperty: state.currentProperty?.id === id 
              ? { ...state.currentProperty, viewCount: state.currentProperty.viewCount + 1 }
              : state.currentProperty,
          }));
        } catch (error) {
          console.error('Failed to increment view count:', error);
        }
      },

      searchProperties: async (query: string, filters = {}) => {
        if (get().loading) return;
        set({ loading: true, error: null });
        try {
          const queryParams = new URLSearchParams({
            q: query,
            ...Object.entries(filters)
              .filter(([_, value]) => value != null && value !== '')
              .reduce((acc, [key, value]) => ({ ...acc, [key]: String(value) }), {})
          });

          const res = await apiRequest(`/properties/search?${queryParams}`);
          set({
            properties: res.data.properties,
            pagination: res.data.pagination,
            loading: false,
          });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to search properties',
            loading: false 
          });
        }
      },

      setFilters: (filters: PropertyFilters) => {
        set({ filters });
      },

      clearFilters: () => {
        set({ filters: {} });
      },

      setLoading: (loading: boolean) => set({ loading }),
      setError: (error: string | null) => set({ error }),
      clearError: () => set({ error: null }),
      reset: () => set(initialState),
    }),
    { name: 'property-store' }
  )
);

// Type for the combined states
interface PropertyStates {
  properties: Property[];
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Individual selectors for better performance - memoized with shallow comparison
export const useProperties = () => usePropertyStore<Property[]>((state) => state.properties);
export const useCurrentProperty = () => usePropertyStore<Property | null>((state) => state.currentProperty);
export const useFeaturedProperties = () => usePropertyStore<Property[]>((state) => state.featuredProperties);
export const usePropertyLoading = () => usePropertyStore<boolean>((state) => state.loading);
export const usePropertyError = () => usePropertyStore<string | null>((state) => state.error);
export const usePropertyFilters = () => usePropertyStore<PropertyFilters>((state) => state.filters);
export const usePropertyPagination = () => usePropertyStore<PropertyState['pagination']>((state) => state.pagination);

// Memoized actions selector using shallow comparison
export const usePropertyActions = () => usePropertyStore<PropertyActions>((state) => ({
  fetchProperties: state.fetchProperties,
  fetchPropertyById: state.fetchPropertyById,
  fetchFeaturedProperties: state.fetchFeaturedProperties,
  createProperty: state.createProperty,
  editProperty: state.editProperty,
  deleteProperty: state.deleteProperty,
  toggleFeatured: state.toggleFeatured,
  incrementViewCount: state.incrementViewCount,
  searchProperties: state.searchProperties,
  setFilters: state.setFilters,
  clearFilters: state.clearFilters,
  setLoading: state.setLoading,
  setError: state.setError,
  clearError: state.clearError,
  reset: state.reset,
}));

// Export a single selector for multiple states to prevent multiple re-renders
export const usePropertyStates = () => usePropertyStore<PropertyStates>((state) => ({
  properties: state.properties,
  loading: state.loading,
  error: state.error,
  pagination: state.pagination,
}));
