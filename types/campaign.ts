export type CampaignType = "Template" | "Custom";

export type CampaignStatus = "Draft" | "Active" | "Scheduled" | "Completed";

export interface Campaign {
    id: string
    name: string
    type: CampaignType
    status: CampaignStatus
    audience: string
    sentCount: number
    message?: string
    templateId?: string
    createdAt: string
    updatedAt: string
    lastSentAt?: string
    clientCount: number
    // Relations
    template?: {
      id: string
      name: string
      content: string
      category: string
      variables: string[]
      language: string
    }
  }
  
export interface CreateCampaignInput {
  name: string;
  type: CampaignType;
  status: CampaignStatus;
  audience: string;
  message?: string;
  templateId?: string;
  clientIds: string[];
}

export interface UpdateCampaignInput extends Partial<CreateCampaignInput> {
  id: string;
}
  