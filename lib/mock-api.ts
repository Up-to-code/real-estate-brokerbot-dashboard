// Mock API server for development and testing
export const mockData = {
  properties: [
    {
      id: "1",
      title: "Luxury Villa with Pool",
      description: "Beautiful 4-bedroom villa with private pool and garden",
      location: "Downtown Dubai, UAE",
      coordinates: { lat: 25.2048, lng: 55.2708 },
      rooms: 4,
      bathrooms: 3,
      features: ["Villa", "Pool", "Garden", "Luxury"],
      images: ["/placeholder.svg?height=300&width=400"],
      price: 2500000,
      status: "available" as const,
      createdAt: "2024-01-15T10:00:00Z",
      updatedAt: "2024-01-15T10:00:00Z",
    },
    {
      id: "2",
      title: "Modern Apartment",
      description: "Contemporary 2-bedroom apartment in prime location",
      location: "Marina District, Dubai",
      coordinates: { lat: 25.0657, lng: 55.1713 },
      rooms: 2,
      bathrooms: 2,
      features: ["Apartment", "Modern", "Furnished"],
      images: ["/placeholder.svg?height=300&width=400"],
      price: 1200000,
      status: "available" as const,
      createdAt: "2024-01-10T14:30:00Z",
      updatedAt: "2024-01-10T14:30:00Z",
    },
  ],
  clients: [
    {
      id: "1",
      name: "John Smith",
      phone: "+971501234567",
      email: "john.smith@email.com",
      lastInteraction: "2024-01-20T09:15:00Z",
      totalMessages: 15,
      status: "active" as const,
      createdAt: "2024-01-01T00:00:00Z",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      phone: "+971507654321",
      email: "sarah.johnson@email.com",
      lastInteraction: "2024-01-19T16:45:00Z",
      totalMessages: 8,
      status: "active" as const,
      createdAt: "2024-01-05T00:00:00Z",
    },
  ],
  messages: [
    {
      id: "1",
      clientId: "1",
      content: "Hi, I'm interested in the villa with pool",
      type: "incoming" as const,
      timestamp: "2024-01-20T09:00:00Z",
      isAI: false,
    },
    {
      id: "2",
      clientId: "1",
      content:
        "I'd be happy to help you with information about our luxury villa. It features 4 bedrooms, 3 bathrooms, and a private pool.",
      type: "outgoing" as const,
      timestamp: "2024-01-20T09:01:00Z",
      isAI: true,
    },
  ],
  templates: [
    {
      id: "1",
      name: "Welcome Message",
      language: "en",
      content: "Welcome to BrokerBot! How can I help you find your dream property today?",
      variables: [],
      status: "active" as const,
      createdAt: "2024-01-01T00:00:00Z",
    },
  ],
  campaigns: [
    {
      id: "1",
      name: "New Property Launch",
      templateId: "1",
      targetClients: ["1", "2"],
      status: "active" as const,
      sentCount: 2,
      deliveredCount: 2,
      readCount: 1,
      createdAt: "2024-01-15T00:00:00Z",
    },
  ],
  qaPairs: [
    {
      id: "1",
      question: "What are your office hours?",
      answer: "Our office is open Monday to Friday, 9 AM to 6 PM, and Saturday 9 AM to 2 PM.",
      category: "General",
      isActive: true,
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    },
  ],
  stats: {
    totalClients: 2,
    totalMessages: 23,
    activeProperties: 2,
    activeCampaigns: 1,
    userActivity: [
      { date: "2024-01-15", interactions: 5 },
      { date: "2024-01-16", interactions: 8 },
      { date: "2024-01-17", interactions: 12 },
      { date: "2024-01-18", interactions: 7 },
      { date: "2024-01-19", interactions: 15 },
      { date: "2024-01-20", interactions: 10 },
    ],
  },
}

// Mock API functions that simulate server responses
export class MockApiClient {
  private delay(ms = 500) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  async healthCheck() {
    await this.delay(100)
    return { status: "ok", timestamp: new Date().toISOString() }
  }

  async getProperties() {
    await this.delay()
    return mockData.properties
  }

  async createProperty(property: any) {
    await this.delay()
    const newProperty = {
      ...property,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    mockData.properties.push(newProperty)
    return newProperty
  }

  async updateProperty(id: string, property: any) {
    await this.delay()
    const index = mockData.properties.findIndex((p) => p.id === id)
    if (index === -1) throw new Error("Property not found")

    mockData.properties[index] = {
      ...mockData.properties[index],
      ...property,
      updatedAt: new Date().toISOString(),
    }
    return mockData.properties[index]
  }

  async deleteProperty(id: string) {
    await this.delay()
    const index = mockData.properties.findIndex((p) => p.id === id)
    if (index === -1) throw new Error("Property not found")

    mockData.properties.splice(index, 1)
    return { success: true }
  }

  async getClients() {
    await this.delay()
    return mockData.clients
  }

  async getMessages(clientId?: string) {
    await this.delay()
    return clientId ? mockData.messages.filter((m) => m.clientId === clientId) : mockData.messages
  }

  async getTemplates() {
    await this.delay()
    return mockData.templates
  }

  async getCampaigns() {
    await this.delay()
    return mockData.campaigns
  }

  async getQAPairs() {
    await this.delay()
    return mockData.qaPairs
  }

  async getDashboardStats() {
    await this.delay()
    return mockData.stats
  }

  // Add these methods to the MockApiClient class after the existing methods

  async createClient(client: any) {
    await this.delay()
    const newClient = {
      ...client,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      totalMessages: 0,
      status: "active" as const,
    }
    mockData.clients.push(newClient)
    return newClient
  }

  async updateClient(id: string, client: any) {
    await this.delay()
    const index = mockData.clients.findIndex((c) => c.id === id)
    if (index === -1) throw new Error("Client not found")

    mockData.clients[index] = {
      ...mockData.clients[index],
      ...client,
    }
    return mockData.clients[index]
  }

  async deleteClient(id: string) {
    await this.delay()
    const index = mockData.clients.findIndex((c) => c.id === id)
    if (index === -1) throw new Error("Client not found")

    mockData.clients.splice(index, 1)
    return { success: true }
  }

  async sendMessage(message: any) {
    await this.delay()
    const newMessage = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
    }
    mockData.messages.push(newMessage)
    return newMessage
  }

  async createTemplate(template: any) {
    await this.delay()
    const newTemplate = {
      ...template,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }
    mockData.templates.push(newTemplate)
    return newTemplate
  }

  async updateTemplate(id: string, template: any) {
    await this.delay()
    const index = mockData.templates.findIndex((t) => t.id === id)
    if (index === -1) throw new Error("Template not found")

    mockData.templates[index] = {
      ...mockData.templates[index],
      ...template,
    }
    return mockData.templates[index]
  }

  async deleteTemplate(id: string) {
    await this.delay()
    const index = mockData.templates.findIndex((t) => t.id === id)
    if (index === -1) throw new Error("Template not found")

    mockData.templates.splice(index, 1)
    return { success: true }
  }

  async createCampaign(campaign: any) {
    await this.delay()
    const newCampaign = {
      ...campaign,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      sentCount: 0,
      deliveredCount: 0,
      readCount: 0,
    }
    mockData.campaigns.push(newCampaign)
    return newCampaign
  }

  async updateCampaign(id: string, campaign: any) {
    await this.delay()
    const index = mockData.campaigns.findIndex((c) => c.id === id)
    if (index === -1) throw new Error("Campaign not found")

    mockData.campaigns[index] = {
      ...mockData.campaigns[index],
      ...campaign,
    }
    return mockData.campaigns[index]
  }

  async deleteCampaign(id: string) {
    await this.delay()
    const index = mockData.campaigns.findIndex((c) => c.id === id)
    if (index === -1) throw new Error("Campaign not found")

    mockData.campaigns.splice(index, 1)
    return { success: true }
  }

  async createQAPair(qaPair: any) {
    await this.delay()
    const newQAPair = {
      ...qaPair,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isActive: true,
    }
    mockData.qaPairs.push(newQAPair)
    return newQAPair
  }

  async updateQAPair(id: string, qaPair: any) {
    await this.delay()
    const index = mockData.qaPairs.findIndex((q) => q.id === id)
    if (index === -1) throw new Error("Q&A pair not found")

    mockData.qaPairs[index] = {
      ...mockData.qaPairs[index],
      ...qaPair,
      updatedAt: new Date().toISOString(),
    }
    return mockData.qaPairs[index]
  }

  async deleteQAPair(id: string) {
    await this.delay()
    const index = mockData.qaPairs.findIndex((q) => q.id === id)
    if (index === -1) throw new Error("Q&A pair not found")

    mockData.qaPairs.splice(index, 1)
    return { success: true }
  }

  async testAIResponse(question: string) {
    await this.delay(1000) // Simulate AI processing time

    // Simple mock AI response logic
    const responses = [
      "Based on your requirements, I'd recommend checking out our luxury villa collection.",
      "I can help you find properties in that area. What's your budget range?",
      "Our office hours are Monday to Friday, 9 AM to 6 PM, and Saturday 9 AM to 2 PM.",
      "I'd be happy to schedule a viewing for you. When would be convenient?",
      "That's a great question! Let me provide you with detailed information about that property.",
    ]

    const randomResponse = responses[Math.floor(Math.random() * responses.length)]

    return {
      question,
      answer: randomResponse,
      confidence: Math.random() * 0.3 + 0.7, // Random confidence between 0.7-1.0
      timestamp: new Date().toISOString(),
    }
  }
}

export const mockApiClient = new MockApiClient()
