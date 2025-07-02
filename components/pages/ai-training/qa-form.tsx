import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface FormData {
  question: string
  answer: string
  category: string
}

interface QAFormProps {
  isEditing: boolean
  formData: FormData
  categories: string[]
  onSubmit: (e: React.FormEvent) => Promise<void>
  onCancel: () => void
  onFormChange: (data: Partial<FormData>) => void
}

export function QAForm({ isEditing, formData, categories, onSubmit, onCancel, onFormChange }: QAFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? "Edit Q&A Pair" : "Add New Q&A Pair"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => onFormChange({ category: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label htmlFor="question">Question</Label>
            <Textarea
              id="question"
              value={formData.question}
              onChange={(e) => onFormChange({ question: e.target.value })}
              placeholder="What question might clients ask?"
              required
            />
          </div>

          <div>
            <Label htmlFor="answer">Answer</Label>
            <Textarea
              id="answer"
              value={formData.answer}
              onChange={(e) => onFormChange({ answer: e.target.value })}
              placeholder="How should the AI respond?"
              rows={4}
              required
            />
          </div>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">{isEditing ? "Update" : "Add"} Q&A Pair</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
} 