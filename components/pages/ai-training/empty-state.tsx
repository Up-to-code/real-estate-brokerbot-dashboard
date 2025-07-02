import { Button } from "@/components/ui/button"
import { AcademicCapIcon, PlusIcon } from "@heroicons/react/24/outline"

interface EmptyStateProps {
  searchTerm: string
  onAddClick: () => void
}

export function EmptyState({ searchTerm, onAddClick }: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      <AcademicCapIcon className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-2 text-sm font-medium text-gray-900">No Q&A pairs found</h3>
      <p className="mt-1 text-sm text-gray-500">
        {searchTerm
          ? "Try adjusting your search criteria."
          : "Get started by adding your first Q&A pair to train the AI."}
      </p>
      {!searchTerm && (
        <div className="mt-6">
          <Button onClick={onAddClick}>
            <PlusIcon className="h-4 w-4 mr-2" />
            Add Q&A Pair
          </Button>
        </div>
      )}
    </div>
  )
} 