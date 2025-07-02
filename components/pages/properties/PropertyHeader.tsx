import {  Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PropertyHeaderProps } from "@/types/property"
import Link from "next/link"

export const PropertyHeader = ({}: PropertyHeaderProps) => (
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
    <div>
      <h1 className="text-3xl font-bold text-text">Properties</h1>
      <p className="text-muted-foreground mt-1">Manage your property listings</p>
    </div>
    <Link href="/properties/create">
      <Button className="flex items-center gap-2">
        <Plus className="h-4 w-4" />
        Add Property
      </Button>
    </Link>
  </div>
) 