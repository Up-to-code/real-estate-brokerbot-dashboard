import { Button } from "@/components/ui/button"
import { PlusIcon } from "@heroicons/react/24/outline"

interface TemplateHeaderProps {
  onAddClick: () => void
}

export function TemplateHeader({ onAddClick }: TemplateHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Message Templates</h1>
        <p className="text-gray-600">Create and manage WhatsApp message templates</p>
      </div>
      <Button onClick={onAddClick}>
        <PlusIcon className="h-4 w-4 mr-2" />
        Add Template
      </Button>
    </div>
  )
} 