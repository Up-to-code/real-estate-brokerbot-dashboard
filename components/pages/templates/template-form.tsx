import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

interface Language {
  code: string
  name: string
}

interface FormData {
  name: string
  language: string
  content: string
  variables: string[]
}

interface TemplateFormProps {
  isEditing: boolean
  formData: FormData
  languages: Language[]
  onSubmit: (e: React.FormEvent) => Promise<void>
  onCancel: () => void
  onFormChange: (data: Partial<FormData>) => void
  isSubmitting: boolean // ✅ جديد
}

export function TemplateForm({
  isEditing,
  formData,
  languages,
  onSubmit,
  onCancel,
  onFormChange,
  isSubmitting,
}: TemplateFormProps) {
  const extractVariables = (content: string): string[] => {
    const matches = content.match(/\{\{(\w+)\}\}/g)
    return matches ? matches.map((match) => match.replace(/[{}]/g, "")) : []
  }

  const renderPreview = (content: string, variables: string[]) => {
    let preview = content
    variables.forEach((variable) => {
      preview = preview.replace(new RegExp(`\\{\\{${variable}\\}\\}`, "g"), `[${variable.toUpperCase()}]`)
    })
    return preview
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? "Edit Template" : "Add New Template"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Template Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => onFormChange({ name: e.target.value })}
                placeholder="Welcome Message"
                required
              />
            </div>

            <div>
              <Label htmlFor="language">Language</Label>
              <select
                id="language"
                value={formData.language}
                onChange={(e) => onFormChange({ language: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <Label htmlFor="content">Message Content</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => onFormChange({ content: e.target.value })}
              placeholder="Hello {{name}}, welcome to BrokerBot! How can I help you find your dream property today?"
              rows={6}
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Use {`{{variable}}`} syntax for dynamic content (e.g., {`{{name}}`}, {`{{property}}`})
            </p>
          </div>

          {formData.content && (
            <div>
              <Label>Preview</Label>
              <div className="p-3 bg-gray-50 rounded-md text-sm">
                {renderPreview(formData.content, extractVariables(formData.content))}
              </div>
              {extractVariables(formData.content).length > 0 && (
                <div className="mt-2">
                  <p className="text-xs text-gray-600">Variables detected:</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {extractVariables(formData.content).map((variable) => (
                      <Badge key={variable} variant="outline" className="text-xs">
                        {variable}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? isEditing
                  ? "Updating..."
                  : "Creating..."
                : isEditing
                ? "Update"
                : "Create"}{" "}
              Template
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
