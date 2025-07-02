"use client"

import { useState, useMemo, useEffect } from "react"
import { toast } from "@/components/ui/use-toast"
import { Property } from "@/types/property"
import { PropertyHeader } from "@/components/pages/properties/PropertyHeader"
import { PropertyFilters } from "@/components/pages/properties/PropertyFilters"
import { PropertyGrid } from "@/components/pages/properties/PropertyGrid"
import { EmptyState } from "@/components/pages/properties/EmptyState"
import { ViewPropertyDialog } from "@/components/pages/properties/ViewPropertyDialog"
import { DeleteConfirmationDialog } from "@/components/pages/properties/DeleteConfirmationDialog"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/Spinner"
import { Pagination } from "@/components/ui/pagination"

export default function PropertiesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("created_at")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [propertyToDelete, setPropertyToDelete] = useState<Property | null>(null)
  const [properties, setProperties] = useState<Property[]>()
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [itemsPerPage] = useState(10)
  const [city, setCity] = useState<string>("")
  const [minPrice, setMinPrice] = useState<string>("")
  const [maxPrice, setMaxPrice] = useState<string>("")

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true)
        setError(null)

        const queryParams = new URLSearchParams({
          page: currentPage.toString(),
          limit: itemsPerPage.toString(),
          ...(city && { city }),
          ...(searchTerm && { search: searchTerm }),
          ...(minPrice && { minPrice }),
          ...(maxPrice && { maxPrice })
        })

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/properties?${queryParams.toString()}`
        )

        if (!response.ok) {
          throw new Error('Failed to fetch properties')
        }

        const { success, data } = await response.json()
        
        if (success) {
          setProperties(data.properties)
          setTotalPages(data.pagination.pages)
        } else {
          throw new Error('Failed to fetch properties')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching properties')
        toast({
          title: "Error",
          description: "Failed to load properties. Please try again later.",
          variant: "destructive"
        })
      } finally {
        setLoading(false)
      }
    }
    fetchProperties()
  }, [currentPage, itemsPerPage, city, searchTerm, minPrice, maxPrice])

  const handleDeleteProperty = async (id: string) => {
    const property = properties?.find(p => p.id === id)
    if (property) {
      setPropertyToDelete(property)
      setDeleteDialogOpen(true)
    }
  }

  const confirmDelete = async () => {
    if (propertyToDelete) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/properties/${propertyToDelete.id}`, {
          method: 'DELETE',
        })
        
        if (!response.ok) {
          throw new Error('Failed to delete property')
        }

        setProperties(prev => prev?.filter(property => property.id !== propertyToDelete.id))
        toast({
          title: "Property Deleted",
          description: `${propertyToDelete.title || "Property"} has been removed.`,
        })
      } catch (err) {
        toast({
          title: "Error",
          description: "Failed to delete property. Please try again later.",
          variant: "destructive"
        })
      } finally {
        setDeleteDialogOpen(false)
        setPropertyToDelete(null)
      }
    }
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto py-6">
        <PropertyHeader />
        
        {/* Filter Section */}
        <div className="flex flex-wrap gap-4 mb-6">
          <Input
            placeholder="Search properties..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-xs"
          />
          
          <Input
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="max-w-xs"
          />
          
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="max-w-[150px]"
            />
            <Input
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="max-w-[150px]"
            />
          </div>
        </div>

        {error ? (
          <div className="text-red-500">{error}</div>
        ) : loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <Spinner />
          </div>
        ) : (
          <>
            <PropertyGrid 
              properties={properties} 
              onDelete={handleDeleteProperty}
              loading={loading}
              onView={(property) => {
                setSelectedProperty(property);
                setViewDialogOpen(true);
              }}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
            {/* Pagination component will be handled inside PropertyGrid */}
          </>
        )}

        <ViewPropertyDialog
          property={selectedProperty}
          isOpen={viewDialogOpen}
          onOpenChange={setViewDialogOpen}
        />

        <DeleteConfirmationDialog
          property={propertyToDelete}
          isOpen={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          onConfirm={confirmDelete}
        />
      </div>
    </DashboardLayout>
  )
}
