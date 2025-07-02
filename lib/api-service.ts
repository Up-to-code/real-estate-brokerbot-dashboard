import type { Property, PropertyInput } from "./api-types";

// Import types from Prisma or define them based on your schema
interface Client {
  id: string
  name: string
  phoneNumber: string
  email?: string
  lastActive: Date
  lastMessage: string
  createdAt: Date
  updatedAt: Date
  type: string
}

interface Message {
  id: string
  text: string
  clientId: string
  isBot: boolean
  createdAt: Date
  updatedAt: Date
  whatsappMessageId?: string
  status?: 'RECEIVED' | 'SENT' | 'DELIVERED' | 'READ' | 'FAILED'
  sentAt?: Date
}

interface QAPair {
  id: string
  question: string
  answer: string
  category: string
  language: string
  isActive: boolean
  tags: string[]
  priority: number
  createdAt: Date
  updatedAt: Date
}

interface Template {
  id: string
  name: string
  content: string
  category: string
  variables: string[]
  language: string
  createdAt: Date
  updatedAt: Date
}

interface Campaign {
  id: string
  name: string
  type: string
  status: string
  audience: string
  sentCount: number
  message?: string
  createdAt: Date
  updatedAt: Date
  lastSentAt?: Date
}

interface DashboardStats {
  totalClients: number;
  totalMessages: number;
  activeCampaigns: number;
  activeClients: number;
}

// Input interfaces for creating/updating
interface QAPairInput {
  question: string
  answer: string
  category: string
  language?: string
  tags?: string[]
  priority?: number
}

interface ClientInput {
  name: string
  phoneNumber: string
  email?: string
}

interface MessageInput {
  text: string
  clientId: string
  isBot?: boolean
  whatsappMessageId?: string
  status?: 'RECEIVED' | 'SENT' | 'DELIVERED' | 'READ' | 'FAILED'
}

interface TemplateInput {
  name: string
  content: string
  category: string
  variables?: string[]
  language?: string
}

interface CampaignInput {
  name: string
  type: string
  audience: string
  message?: string
  status?: string
}

class APIService {
  private baseUrl = process.env.NEXT_PUBLIC_API_URL

  // Q&A Pairs
  async getQAPairs(): Promise<QAPair[]> {
    const response = await fetch(`${this.baseUrl}/qa-pairs`)
    if (!response.ok) {
      throw new Error("Failed to fetch Q&A pairs")
    }
    return response.json()
  }

  async createQAPair(data: QAPairInput): Promise<QAPair> {
    const response = await fetch(`${this.baseUrl}/qa-pairs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      throw new Error("Failed to create Q&A pair")
    }
    return response.json()
  }

  async updateQAPair(id: string, data: Partial<QAPair>): Promise<QAPair> {
    const response = await fetch(`${this.baseUrl}/qa-pairs/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      throw new Error("Failed to update Q&A pair")
    }
    return response.json()
  }

  async deleteQAPair(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/qa-pairs/${id}`, {
      method: "DELETE",
    })
    if (!response.ok) {
      throw new Error("Failed to delete Q&A pair")
    }
  }

  // AI Testing
  async testAIResponse(question: string): Promise<{
    question: string
    answer: string
    confidence: number
  }> {
    const response = await fetch(`${this.baseUrl}/ai/test`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question }),
    })
    if (!response.ok) {
      throw new Error("Failed to test AI response")
    }
    return response.json()
  }

  // Clients
  async getClients(): Promise<Client[]> {
    const response = await fetch(`${this.baseUrl}/clients`)
    if (!response.ok) {
      throw new Error("Failed to fetch clients")
    }
    return response.json()
  }

  async createClient(data: ClientInput): Promise<Client> {
    const response = await fetch(`${this.baseUrl}/clients`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      throw new Error("Failed to create client")
    }
    return response.json()
  }

  async updateClient(id: string, data: Partial<ClientInput>): Promise<Client> {
    const response = await fetch(`${this.baseUrl}/clients/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      throw new Error("Failed to update client")
    }
    return response.json()
  }

  async deleteClient(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/clients/${id}`, {
      method: "DELETE",
    })
    if (!response.ok) {
      throw new Error("Failed to delete client")
    }
  }

  // Messages
  async getMessages(clientId?: string): Promise<Message[]> {
    const response = await fetch(`${this.baseUrl}/messages${clientId ? `?clientId=${clientId}` : ""}`)
    if (!response.ok) {
      throw new Error("Failed to fetch messages")
    }
    return response.json()
  }

  async sendMessage(data: MessageInput): Promise<Message> {
    const response = await fetch(`${this.baseUrl}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      throw new Error("Failed to send message")
    }
    return response.json()
  }

  // Templates
  async getTemplates(): Promise<Template[]> {
    const response = await fetch(`${this.baseUrl}/templates`)
    if (!response.ok) {
      throw new Error("Failed to fetch templates")
    }
    return response.json()
  }

  async createTemplate(data: TemplateInput): Promise<Template> {
    const response = await fetch(`${this.baseUrl}/templates`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      throw new Error("Failed to create template")
    }
    return response.json()
  }

  async updateTemplate(id: string, data: Partial<TemplateInput>): Promise<Template> {
    const response = await fetch(`${this.baseUrl}/templates/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      throw new Error("Failed to update template")
    }
    return response.json()
  }

  async deleteTemplate(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/templates/${id}`, {
      method: "DELETE",
    })
    if (!response.ok) {
      throw new Error("Failed to delete template")
    }
  }

  // Campaigns
  async getCampaigns(): Promise<Campaign[]> {
    const response = await fetch(`${this.baseUrl}/campaigns`)
    if (!response.ok) {
      throw new Error("Failed to fetch campaigns")
    }
    return response.json()
  }

  async createCampaign(data: CampaignInput): Promise<Campaign> {
    const response = await fetch(`${this.baseUrl}/campaigns`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      throw new Error("Failed to create campaign")
    }
    return response.json()
  }

  async updateCampaign(id: string, data: Partial<CampaignInput>): Promise<Campaign> {
    const response = await fetch(`${this.baseUrl}/campaigns/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      throw new Error("Failed to update campaign")
    }
    return response.json()
  }

  async deleteCampaign(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/campaigns/${id}`, {
      method: "DELETE",
    })
    if (!response.ok) {
      throw new Error("Failed to delete campaign")
    }
  }

  async executeCampaign(id: string): Promise<{ success: boolean; sent: number; failed: number }> {
    const response = await fetch(`${this.baseUrl}/campaigns/${id}/execute`, {
      method: "POST",
    })
    if (!response.ok) {
      throw new Error("Failed to execute campaign")
    }
    return response.json()
  }

  // Properties
  async getProperties(filters?: {
    type?: Property['type']
    status?: Property['status']
    city?: string
    minPrice?: number
    maxPrice?: number
    bedrooms?: number
    bathrooms?: number
  }): Promise<Property[]> {
    const params = new URLSearchParams()
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          params.append(key, value.toString())
        }
      })
    }
    
    const response = await fetch(`${this.baseUrl}/properties${params.toString() ? `?${params.toString()}` : ""}`)
    if (!response.ok) {
      throw new Error("Failed to fetch properties")
    }
    return response.json()
  }

  async getProperty(id: string): Promise<Property> {
    const response = await fetch(`${this.baseUrl}/properties/${id}`)
    if (!response.ok) {
      throw new Error("Failed to fetch property")
    }
    return response.json()
  }

  async createProperty(data: PropertyInput): Promise<Property> {
    const response = await fetch(`${this.baseUrl}/properties`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      throw new Error("Failed to create property")
    }
    return response.json()
  }

  async updateProperty(id: string, data: Partial<PropertyInput>): Promise<Property> {
    const response = await fetch(`${this.baseUrl}/properties/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      throw new Error("Failed to update property")
    }
    return response.json()
  }

  async deleteProperty(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/properties/${id}`, {
      method: "DELETE",
    })
    if (!response.ok) {
      throw new Error("Failed to delete property")
    }
  }

  async incrementPropertyViews(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/properties/${id}/views`, {
      method: "POST",
    })
    if (!response.ok) {
      throw new Error("Failed to increment property views")
    }
  }

  // Dashboard
  async getDashboardStats(): Promise<DashboardStats> {
    const response = await fetch(`${this.baseUrl}/`)
    if (!response.ok) {
      throw new Error("Failed to fetch dashboard stats")
    }
    return response.json()
  }

  // Bulk operations
  async uploadProperties(properties: PropertyInput[]): Promise<{ success: number; failed: number; errors: string[] }> {
    const response = await fetch(`${this.baseUrl}/properties/bulk`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ properties }),
    })
    if (!response.ok) {
      throw new Error("Failed to upload properties")
    }
    return response.json()
  }

  async exportData(type: 'clients' | 'messages' | 'properties' | 'qa-pairs'): Promise<Blob> {
    const response = await fetch(`${this.baseUrl}/export/${type}`)
    if (!response.ok) {
      throw new Error(`Failed to export ${type}`)
    }
    return response.blob()
  }
}

export const apiService = new APIService()