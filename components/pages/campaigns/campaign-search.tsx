"use client";

import { Input } from "@/components/ui/input"
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"

interface CampaignSearchProps {
  searchTerm: string
  onSearchChange: (value: string) => void
}

export function CampaignSearch({ searchTerm, onSearchChange }: CampaignSearchProps) {
  return (
    <div className="relative">
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      <Input
        placeholder="Search campaigns..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-10"
      />
    </div>
  )
} 