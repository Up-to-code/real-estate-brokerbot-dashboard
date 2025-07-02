interface ClientHeaderProps {
  viewMode: "list" | "chat" | "calendar"
  onViewModeChange: (mode: "list" | "chat" | "calendar") => void
}

import { Button } from "@/components/ui/button"
import { CalendarIcon } from "@heroicons/react/24/outline"

export function ClientHeader({ viewMode, onViewModeChange }: ClientHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Clients</h1>
        <p className="text-gray-600">Manage your client relationships</p>
      </div>
      <div className="flex space-x-2">
        <Button variant={viewMode === "list" ? "default" : "outline"} onClick={() => onViewModeChange("list")}>
          List
        </Button>
        <Button variant={viewMode === "calendar" ? "default" : "outline"} onClick={() => onViewModeChange("calendar")}>
          <CalendarIcon className="h-4 w-4 mr-2" />
          Calendar
        </Button>
      </div>
    </div>
  )
} 