import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline"

interface TestResult {
  question: string
  answer: string
  confidence: number
}

interface AITestingSectionProps {
  onTest: (question: string) => Promise<void>
  testResult: TestResult | null
  testLoading: boolean
}

export function AITestingSection({ onTest, testResult, testLoading }: AITestingSectionProps) {
  const [testQuestion, setTestQuestion] = useState("")

  const handleTest = () => {
    if (!testQuestion.trim()) return
    onTest(testQuestion)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <ChatBubbleLeftRightIcon className="h-5 w-5 mr-2" />
          Test AI Response
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-4">
          <div className="flex-1">
            <Input
              placeholder="Ask a question to test the AI..."
              value={testQuestion}
              onChange={(e) => setTestQuestion(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleTest()}
            />
          </div>
          <Button onClick={handleTest} disabled={testLoading || !testQuestion.trim()}>
            {testLoading ? "Testing..." : "Test"}
          </Button>
        </div>

        {testResult && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="space-y-2">
              <div>
                <strong>Question:</strong> {testResult.question}
              </div>
              <div>
                <strong>AI Response:</strong> {testResult.answer}
              </div>
              <div className="flex items-center space-x-2">
                <strong>Confidence:</strong>
                <Badge variant={testResult.confidence > 0.8 ? "default" : "secondary"}>
                  {Math.round(testResult.confidence * 100)}%
                </Badge>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 