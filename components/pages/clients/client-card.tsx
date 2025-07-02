import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChatBubbleLeftRightIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline"

interface Client {
  id: string
  name: string
  status: string
  phone: string
  email?: string
  totalMessages: number
  lastInteraction: string
}

interface ClientCardProps {
  client: Client
  onChatClick: (id: string) => void
  onDeleteClick: (id: string) => void
}

export function ClientCard({ client, onChatClick, onDeleteClick }: ClientCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg">{client.name}</h3>
          <Badge variant={client.status === "active" ? "default" : "secondary"}>{client.status}</Badge>
        </div>

        <div className="space-y-2 text-sm text-gray-600">
          <p>📞 {client.phone}</p>
          {client.email && <p>✉️ {client.email}</p>}
          <p>💬 {client.totalMessages} messages</p>
          <p>🕒 Last: {new Date(client.lastInteraction).toLocaleDateString()}</p>
        </div>

        <div className="flex justify-between mt-4">
          <Button variant="outline" size="sm" onClick={() => onChatClick(client.id)}>
            <ChatBubbleLeftRightIcon className="h-4 w-4 mr-1" />
            Chat
          </Button>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <PencilIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDeleteClick(client.id)}
              className="text-red-600 hover:text-red-700"
            >
              <TrashIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 