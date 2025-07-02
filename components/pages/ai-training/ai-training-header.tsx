import { Button } from "@/components/ui/button"
import { PlusIcon } from "@heroicons/react/24/outline"

interface AITrainingHeaderProps {
  onAddClick: () => void
}

export function AITrainingHeader({ onAddClick }: AITrainingHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">AI Training</h1>
        <p className="text-gray-600">Train your AI bot with questions and answers</p>
      </div>
      <Button onClick={onAddClick}>
        <PlusIcon className="h-4 w-4 mr-2" />
        Add Q&A Pair
      </Button>
    </div>
  )
} 