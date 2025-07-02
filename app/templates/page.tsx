"use client"

import { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import {
  TemplateHeader,
  TemplateSearch,
  TemplateForm,
  TemplateCard,
} from "@/components/pages/templates"
import { useTemplateStore } from "@/store/templateStore"

export default function TemplatesPage() {
  const {
    templates,
    fetchTemplates,
    createTemplate,
    updateTemplate,
    deleteTemplate,
    toggleTemplateStatus,
    loading,
  } = useTemplateStore()

  const [searchTerm, setSearchTerm] = useState("")
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    language: "en",
    content: "",
    variables: [] as string[],
  })

  const languages = [
    { code: "en", name: "English" },
    { code: "ar", name: "Arabic" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
  ]

  useEffect(() => {
    fetchTemplates()
  }, [])

  const extractVariables = (content: string): string[] => {
    const matches = content.match(/\{\{(\w+)\}\}/g)
    return matches ? matches.map((m) => m.replace(/[{}]/g, "")) : []
  }

  const filteredTemplates = templates.filter((t) =>
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.content.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const variables = extractVariables(formData.content)
      const data = { ...formData, variables }

      if (editingId) {
        await updateTemplate(editingId, data)
        setEditingId(null)
      } else {
        await createTemplate(data)
        setShowAddForm(false)
      }

      setFormData({ name: "", language: "en", content: "", variables: [] })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEdit = (template: any) => {
    setFormData({
      name: template.name,
      language: template.language,
      content: template.content,
      variables: template.variables,
    })
    setEditingId(template.id)
    setShowAddForm(true)
  }

  const handleCancel = () => {
    setEditingId(null)
    setFormData({ name: "", language: "en", content: "", variables: [] })
    setShowAddForm(false)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <TemplateHeader onAddClick={() => setShowAddForm(true)} />

        {showAddForm && (
          <TemplateForm
            isEditing={!!editingId}
            formData={formData}
            languages={languages}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            onFormChange={(data) => setFormData((prev) => ({ ...prev, ...data }))}
            isSubmitting={isSubmitting}
          />
        )}

        <TemplateSearch
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        {loading ? (
          <div className="text-center text-gray-500 py-12 animate-pulse">
            Loading templates...
          </div>
        ) : filteredTemplates.length === 0 ? (
          <div className="text-center text-gray-400 py-12">
            No templates found.
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                onEdit={handleEdit}
                onDelete={deleteTemplate}
                onToggleStatus={toggleTemplateStatus}
                onPreview={() => {}}
              />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
