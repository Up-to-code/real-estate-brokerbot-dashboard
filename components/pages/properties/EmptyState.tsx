import { Home,  Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EmptyStateProps } from "@/types/property"
import Link from "next/link"

export const EmptyState = ({ hasFilters, onClearFilters }: EmptyStateProps) => (
  <div className="text-center py-12">
    <Home className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
    <h3 className="text-lg font-medium mb-2">
      {hasFilters ? "No properties found" : "No properties yet"}
    </h3>
    <p className="text-muted-foreground mb-4">
      {hasFilters 
        ? "Try adjusting your search or filter criteria"
        : "Get started by adding your first property"
      }
    </p>
    {hasFilters ? (
      <Button variant="outline" onClick={onClearFilters}>
        Clear Filters
      </Button>
    ) : (
      <Link href="/properties/create">
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Property
        </Button>
      </Link>
    )}
  </div>
) 