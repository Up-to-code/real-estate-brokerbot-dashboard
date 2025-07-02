import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { PropertyFiltersProps } from "@/types/property"

export const PropertyFilters = ({
  searchTerm,
  filterStatus,
  sortBy,
  sortOrder,
  onSearchChange,
  onStatusChange,
  onSortByChange,
  onSortOrderChange,
}: PropertyFiltersProps) => (
  <div className="flex flex-col sm:flex-row gap-4 items-center">
    <div className="relative flex-1 max-w-sm">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        placeholder="Search properties..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-10"
      />
    </div>
    <div className="flex gap-2">
      <select
        value={filterStatus}
        onChange={(e) => onStatusChange(e.target.value)}
        className="px-3 py-2 border border-input rounded-lg bg-background text-sm"
      >
        <option value="all">All Status</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
        <option value="pending">Pending</option>
        <option value="sold">Sold</option>
      </select>
      <select
        value={sortBy}
        onChange={(e) => onSortByChange(e.target.value)}
        className="px-3 py-2 border border-input rounded-lg bg-background text-sm"
      >
        <option value="created_at">Date Created</option>
        <option value="title">Title</option>
        <option value="price">Price</option>
        <option value="updated_at">Last Updated</option>
      </select>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onSortOrderChange(sortOrder === "asc" ? "desc" : "asc")}
      >
        {sortOrder === "asc" ? "↑" : "↓"}
      </Button>
    </div>
  </div>
) 