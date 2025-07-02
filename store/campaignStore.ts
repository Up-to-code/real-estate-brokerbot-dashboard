import { create } from 'zustand'
 import axios from 'axios'
import { Campaign } from '@/types/campaign'
interface CampaignStore {
  campaigns: Campaign[]
  fetchCampaigns: () => Promise<void>
  createCampaign: (data: any) => Promise<void>
  updateCampaign: (id: string, data: any) => Promise<void>
  deleteCampaign: (id: string) => Promise<void>
  changeStatus: (id: string, status: string) => Promise<void>
}
const baseUrl = process.env.NEXT_PUBLIC_API_URL 
export const useCampaignStore = create<CampaignStore>((set) => ({
  campaigns: [],

  fetchCampaigns: async () => {
    const res = await axios.get(`${baseUrl}/campaigns`) 
    set({ campaigns: res.data.data })
  },

  createCampaign: async (data) => {
    await axios.post(`${baseUrl}/campaigns`, data)
  },

  updateCampaign: async (id, data) => {
    await axios.put(`${baseUrl}/campaigns/${id}`, data)
  },

  deleteCampaign: async (id) => {
    await axios.delete(`${baseUrl}/campaigns/${id}`)
  },

  changeStatus: async (id, status) => {
    await axios.post(`${baseUrl}/campaigns/${id}/send`, { status })
  },
}))
