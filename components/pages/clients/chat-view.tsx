"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

interface Message {
  id: string
  clientId: string
  content: string
  type: "incoming" | "outgoing"
  timestamp: string
  isAI: boolean
}

interface Client {
  id: string
  name: string
}

interface ChatViewProps {
  client: Client
  messages: Message[]
  onClose: () => void
  onSendMessage: (message: { clientId: string; content: string; type: "outgoing"; isAI: boolean }) => Promise<void>
}

export function ChatView({ client, messages, onClose, onSendMessage }: ChatViewProps) {
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return

    await onSendMessage({
      clientId: client.id,
      content: newMessage,
      type: "outgoing",
      isAI: false,
    })
    setNewMessage("")
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Chat with {client.name}</CardTitle>
          <Button variant="outline" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-96 flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-4 border rounded-lg mb-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === "outgoing" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.type === "outgoing" ? "bg-primary  text-white" : "bg-gray-100 text-gray-900"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs mt-1 opacity-70">{new Date(message.timestamp).toLocaleTimeString()}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex space-x-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
              Send
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 