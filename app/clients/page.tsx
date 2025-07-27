"use client"
// Enhanced Client Store with Better Logging (store/clientStore.ts)
import { create } from 'zustand'
import axios from 'axios'
import { Client } from '@/types/client'
import { getErrorMessage } from '@/lib/api'

interface ClientState {
  clients: Client[]
  loading: boolean
  error: string | null
  fetchClients: () => Promise<void>
  createClient: (data: { name: string; phone?: string; email?: string }) => Promise<void>
  updateClient: (id: string, data: Partial<Client>) => Promise<void>
  deleteClient: (id: string) => Promise<void>
  clearError: () => void
}

const baseUrl = process.env.NEXT_PUBLIC_API_URL

// Enhanced logging utility
const logAction = (action: string, data?: any, error?: any) => {
  const timestamp = new Date().toISOString()
  const logData = {
    timestamp,
    action,
    data,
    error: error ? getErrorMessage(error) : null
  }
  
  console.group(`🔧 Client Store - ${action}`)
  console.log('Timestamp:', timestamp)
  if (data) console.log('Data:', data)
  if (error) console.error('Error:', error)
  console.groupEnd()
  
  // Store in localStorage for debugging (optional)
  const logs = JSON.parse(localStorage.getItem('clientStoreLogs') || '[]')
  logs.push(logData)
  localStorage.setItem('clientStoreLogs', JSON.stringify(logs.slice(-50))) // Keep last 50 logs
}

export const useClientStore = create<ClientState>((set, get) => ({
  clients: [],
  loading: false,
  error: null,

  clearError: () => {
    set({ error: null })
  },

  fetchClients: async () => {
    logAction('FETCH_CLIENTS_START')
    try {
      set({ loading: true, error: null })
      const res = await axios.get(`${baseUrl}/clients`)
      
      logAction('FETCH_CLIENTS_SUCCESS', { 
        count: res.data.clients?.length || 0,
        clients: res.data.clients 
      })
      
      set({ clients: res.data.clients || [], loading: false })
    } catch (error) {
      const errorMessage = getErrorMessage(error)
      logAction('FETCH_CLIENTS_ERROR', null, error)
      set({ error: errorMessage, loading: false })
    }
  },

  createClient: async (data) => {
    logAction('CREATE_CLIENT_START', data)
    try {
      set({ error: null })
      
      // Validate required fields
      if (!data.name?.trim()) {
        throw new Error('اسم العميل مطلوب')
      }

      const payload = {
        name: data.name.trim(),
        phone: data.phone?.trim() || '',
        email: data.email?.trim() || '',
      }
      
      const res = await axios.post(`${baseUrl}/clients`, payload)
      const newClient = res.data
      
      logAction('CREATE_CLIENT_SUCCESS', { 
        clientId: newClient.id,
        clientName: newClient.name 
      })
      
      set({ clients: [...get().clients, newClient] })
    } catch (error) {
      const errorMessage = getErrorMessage(error)
      logAction('CREATE_CLIENT_ERROR', data, error)
      set({ error: errorMessage })
      throw error
    }
  },

  updateClient: async (id, data) => {
    logAction('UPDATE_CLIENT_START', { id, data })
    try {
      set({ error: null })
      const res = await axios.put(`${baseUrl}/clients/${id}`, data)
      const updatedClient = res.data
      
      logAction('UPDATE_CLIENT_SUCCESS', { 
        clientId: id,
        updatedFields: Object.keys(data) 
      })
      
      set({
        clients: get().clients.map((client) =>
          client.id === id ? updatedClient : client
        ),
      })
    } catch (error) {
      const errorMessage = getErrorMessage(error)
      logAction('UPDATE_CLIENT_ERROR', { id, data }, error)
      set({ error: errorMessage })
      throw error
    }
  },

  deleteClient: async (id) => {
    logAction('DELETE_CLIENT_START', { id })
    try {
      set({ error: null })
      await axios.delete(`${baseUrl}/clients/${id}`)
      
      logAction('DELETE_CLIENT_SUCCESS', { clientId: id })
      
      set({
        clients: get().clients.filter((client) => client.id !== id),
      })
    } catch (error) {
      const errorMessage = getErrorMessage(error)
      logAction('DELETE_CLIENT_ERROR', { id }, error)
      set({ error: errorMessage })
      throw error
    }
  },
}))

// Enhanced Clients Page Component with Table UI
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  MessageCircle, 
  Phone, 
  Mail,
  User,
  Calendar,
  Filter,
  Download,
  RefreshCw
} from "lucide-react"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from 'next/link'

interface NewClientForm {
  name: string
  phone?: string
  email?: string
}

interface ClientsPageProps {}

export default function ClientsPage({}: ClientsPageProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedClient, setSelectedClient] = useState<string | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingClient, setEditingClient] = useState<any>(null)
  const [sortBy, setSortBy] = useState<'name' | 'phone' | 'email' | 'createdAt'>('name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  const {
    clients,
    loading,
    error,
    fetchClients,
    deleteClient,
    createClient,
    updateClient,
    clearError,
  } = useClientStore()

  const { 
    register: registerCreate, 
    handleSubmit: handleSubmitCreate, 
    reset: resetCreate, 
    formState: { isSubmitting: isCreating, errors: createErrors } 
  } = useForm<NewClientForm>()

  const { 
    register: registerEdit, 
    handleSubmit: handleSubmitEdit, 
    reset: resetEdit, 
    setValue: setEditValue,
    formState: { isSubmitting: isEditing, errors: editErrors } 
  } = useForm<NewClientForm>()

  useEffect(() => {
    fetchClients()
  }, [fetchClients])

  // Filter and sort clients
  const filteredAndSortedClients = clients
    .filter((client: any) => {
      const searchLower = searchTerm.toLowerCase()
      return (
        client.name?.toLowerCase().includes(searchLower) ||
        client.phone?.includes(searchTerm) ||
        client.email?.toLowerCase().includes(searchLower)
      )
    })
    .sort((a: any, b: any) => {
      const aValue = a[sortBy] || ''
      const bValue = b[sortBy] || ''
      
      if (sortOrder === 'asc') {
        return aValue.localeCompare(bValue)
      } else {
        return bValue.localeCompare(aValue)
      }
    })

  const handleDeleteClient = async (id: string, clientName: string) => {
    if (confirm(`هل أنت متأكد من حذف العميل "${clientName}"؟`)) {
      try {
        await deleteClient(id)
        if (selectedClient === id) {
          setSelectedClient(null)
        }
      } catch (error) {
        console.error("Failed to delete client:", getErrorMessage(error))
      }
    }
  }

  const handleCreateClient = async (data: NewClientForm) => {
    try {
      await createClient(data)
      resetCreate()
      setIsCreateDialogOpen(false)
    } catch (error) {
      // Error is handled in store
    }
  }

  const handleEditClient = async (data: NewClientForm) => {
    if (!editingClient) return
    
    try {
      await updateClient(editingClient.id, data)
      resetEdit()
      setIsEditDialogOpen(false)
      setEditingClient(null)
    } catch (error) {
      // Error is handled in store
    }
  }

  const openEditDialog = (client: any) => {
    setEditingClient(client)
    setEditValue('name', client.name || '')
    setEditValue('phone', client.phone || '')
    setEditValue('email', client.email || '')
    setIsEditDialogOpen(true)
  }

  const handleSort = (field: 'name' | 'phone' | 'email' | 'createdAt') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortOrder('asc')
    }
  }

  const exportToCSV = () => {
    const headers = ['الاسم', 'الهاتف', 'البريد الإلكتروني', 'تاريخ الإنشاء']
    const csvContent = [
      headers.join(','),
      ...filteredAndSortedClients.map((client: any) => 
        [
          client.name || '',
          client.phone || '',
          client.email || '',
          client.createdAt ? new Date(client.createdAt).toLocaleDateString('ar') : ''
        ].join(',')
      )
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `clients-${new Date().toISOString().split('T')[0]}.csv`
    link.click()
  }

  if (loading && clients.length === 0) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-600">جاري تحميل العملاء...</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">إدارة العملاء</h1>
            <p className="text-gray-600">إدارة قاعدة بيانات العملاء والتواصل معهم</p>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => fetchClients()}
              disabled={loading}
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              تحديث
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={exportToCSV}
              disabled={filteredAndSortedClients.length === 0}
            >
              <Download className="h-4 w-4" />
              تصدير
            </Button>
            
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4" />
                  إضافة عميل
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>إضافة عميل جديد</DialogTitle>
                  <DialogDescription>
                    أدخل بيانات العميل الجديد
                  </DialogDescription>
                </DialogHeader>
                
                <form onSubmit={handleSubmitCreate(handleCreateClient)} className="space-y-4">
                  <div>
                    <Input
                      placeholder="الاسم *"
                      {...registerCreate("name", { 
                        required: "الاسم مطلوب",
                        minLength: { value: 2, message: "الاسم يجب أن يكون أكثر من حرفين" }
                      })}
                      disabled={isCreating}
                    />
                    {createErrors.name && (
                      <p className="text-red-500 text-sm mt-1">{createErrors.name.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Input 
                      placeholder="رقم الهاتف (اختياري)" 
                      {...registerCreate("phone")}
                      disabled={isCreating}
                    />
                  </div>
                  
                  <div>
                    <Input 
                      placeholder="البريد الإلكتروني (اختياري)" 
                      type="email"
                      {...registerCreate("email")}
                      disabled={isCreating}
                    />
                  </div>
                  
                  <DialogFooter>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setIsCreateDialogOpen(false)}
                      disabled={isCreating}
                    >
                      إلغاء
                    </Button>
                    <Button type="submit" disabled={isCreating}>
                      {isCreating ? "جاري الإضافة..." : "إضافة"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">إجمالي العملاء</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{clients.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">العملاء المفلترين</CardTitle>
              <Filter className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{filteredAndSortedClients.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">العملاء الجدد اليوم</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {clients.filter((client: any) => {
                  const today = new Date().toDateString()
                  const clientDate = new Date(client.createdAt || '').toDateString()
                  return clientDate === today
                }).length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive">
            <AlertDescription className="flex items-center justify-between">
              {error}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearError}
                className="text-red-600 hover:text-red-800"
              >
                إغلاق
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="البحث عن عميل..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            <Button
              variant={sortBy === 'name' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleSort('name')}
            >
              الاسم {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
            </Button>
            <Button
              variant={sortBy === 'createdAt' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleSort('createdAt')}
            >
              التاريخ {sortBy === 'createdAt' && (sortOrder === 'asc' ? '↑' : '↓')}
            </Button>
          </div>
        </div>

        {/* Clients Table */}
        <Card>
          <CardContent className="p-0">
            {filteredAndSortedClients.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <User className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium mb-2">
                  {searchTerm ? "لم يتم العثور على عملاء" : "لا يوجد عملاء حتى الآن"}
                </h3>
                <p className="text-sm">
                  {searchTerm ? "جرب البحث بكلمات مختلفة" : "ابدأ بإضافة عميل جديد"}
                </p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right">الاسم</TableHead>
                    <TableHead className="text-right">الهاتف</TableHead>
                    <TableHead className="text-right">البريد الإلكتروني</TableHead>
                    <TableHead className="text-right">تاريخ الإنشاء</TableHead>
                    <TableHead className="text-right">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAndSortedClients.map((client: any) => (
                    <TableRow key={client.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="h-4 w-4 bg-primary" />
                          </div>
                          {client.name}
                        </div>
                      </TableCell>
                      <TableCell>
                        {client.phone ? (
                          <div className="flex items-center gap-1">
                            <Phone className="h-3 w-3 text-gray-400" />
                            {client.phone}
                          </div>
                        ) : (
                          <span className="text-gray-400">غير محدد</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {client.email ? (
                          <div className="flex items-center gap-1">
                            <Mail className="h-3 w-3 text-gray-400" />
                            {client.email}
                          </div>
                        ) : (
                          <span className="text-gray-400">غير محدد</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {client.createdAt ? (
                          <Badge variant="secondary">
                            {new Date(client.createdAt).toLocaleDateString('ar')}
                          </Badge>
                        ) : (
                          <span className="text-gray-400">غير محدد</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Link href={`/clients/chat/${client.id}`} >
                          <Button
                            variant="ghost"
                            size="sm"
                             className="text-blue-800"
                          >
                            <MessageCircle className="h-4 w-4" />
                          </Button></Link>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openEditDialog(client)}
                            className="text-gray-600 hover:text-gray-800"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteClient(client.id, client.name)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>تعديل بيانات العميل</DialogTitle>
              <DialogDescription>
                تعديل بيانات العميل {editingClient?.name}
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmitEdit(handleEditClient)} className="space-y-4">
              <div>
                <Input
                  placeholder="الاسم *"
                  {...registerEdit("name", { 
                    required: "الاسم مطلوب",
                    minLength: { value: 2, message: "الاسم يجب أن يكون أكثر من حرفين" }
                  })}
                  disabled={isEditing}
                />
                {editErrors.name && (
                  <p className="text-red-500 text-sm mt-1">{editErrors.name.message}</p>
                )}
              </div>
              
              <div>
                <Input 
                  placeholder="رقم الهاتف (اختياري)" 
                  {...registerEdit("phone")}
                  disabled={isEditing}
                />
              </div>
              
              <div>
                <Input 
                  placeholder="البرhover:لكتروني (اختياري)" 
                  type="email"
                  {...registerEdit("email")}
                  disabled={isEditing}
                />
              </div>
              
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setIsEditDialogOpen(false)
                    setEditingClient(null)
                  }}
                  disabled={isEditing}
                >
                  إلغاء
                </Button>
                <Button type="submit" disabled={isEditing}>
                  {isEditing ? "جاري التحديث..." : "تحديث"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}