import { create } from 'zustand'
import axios from 'axios'
import { Client } from '@/types/client'
import { getErrorMessage } from '@/lib/api'

interface ClientState {
  clients: Client[]
  fetchClients: () => Promise<void>
  createClient: (data: Partial<Client>) => Promise<void>
  updateClient: (id: string, data: Partial<Client>) => Promise<void>
  deleteClient: (id: string) => Promise<void>
}
 const baseUrl = process.env.NEXT_PUBLIC_API_URL
export const useClientStore = create<ClientState>((set, get) => ({
  clients: [],

  fetchClients: async () => {
    try {
      const res = await axios.get(`${baseUrl}/clients`)
      if (res.data.success) {
        set({ clients: res.data.data })
      }
    } catch (error) {
      console.error('fetchClients error:', getErrorMessage(error))
    }
  },

  createClient: async (data) => {
    try {
      const res = await axios.post(`${baseUrl}/clients`, data)
      if (res.data.success) {
        set({ clients: [...get().clients, res.data.data] })
      }
    } catch (error) {
      console.error('createClient error:', getErrorMessage(error))
    }
  },

  updateClient: async (id, data) => {
    try {
      const res = await axios.put(`${baseUrl}/clients/${id}`, data)
      if (res.data.success) {
        set({
          clients: get().clients.map((client) =>
            client.id === id ? res.data.data : client
          ),
        })
      }
    } catch (error) {
      console.error('updateClient error:', getErrorMessage(error))
    }
  },

  deleteClient: async (id) => {
    try {
      const res = await axios.delete(`${baseUrl}/clients/${id}`)
      if (res.data.success) {
        set({
          clients: get().clients.filter((client) => client.id !== id),
        })
      }
    } catch (error) {
      console.error('deleteClient error:', getErrorMessage(error))
    }
  },
}))
