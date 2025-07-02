"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2, Eye, ToggleLeft, ToggleRight } from "lucide-react"
import type { Template } from "@/store/templateStore"

interface TemplateCardProps {
  template: Template
  onEdit: (template: Template) => void
  onDelete: (id: string) => void
  onToggleStatus: (template: Template) => void
  onPreview: () => void
}

export function TemplateCard({
  template,
  onEdit,
  onDelete,
  onToggleStatus,
  onPreview,
}: TemplateCardProps) {
  return (
    <Card className="relative group transition-all hover:shadow-md">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{template.name}</span>
          <Badge
            variant={template.status === "active" ? "default" : "outline"}
            className={template.status === "inactive" ? "text-gray-500 border-gray-300" : ""}
          >
            {template.status}
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-3">{template.content}</p>

        <div className="flex flex-wrap gap-2">
          {template.variables.map((v) => (
            <Badge key={v} variant="outline" className="text-xs">
              {v}
            </Badge>
          ))}
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button variant="ghost" size="icon" onClick={() => onPreview()}>
            <Eye className="w-4 h-4" />
          </Button>

          <Button variant="ghost" size="icon" onClick={() => onEdit(template)}>
            <Pencil className="w-4 h-4" />
          </Button>

          <Button variant="ghost" size="icon" onClick={() => onToggleStatus(template)}>
            {template.status === "active" ? (
              <ToggleLeft className="w-4 h-4 text-red-500" />
            ) : (
              <ToggleRight className="w-4 h-4 text-green-500" />
            )}
          </Button>

          <Button variant="ghost" size="icon" onClick={() => onDelete(template.id)}>
            <Trash2 className="w-4 h-4 text-red-600" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
