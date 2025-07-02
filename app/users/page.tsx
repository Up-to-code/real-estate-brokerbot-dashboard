"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { PageHeader } from "@/components/ui/page-header"
import { DataTable } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { getText, formatDate } from "@/lib/text-content"
import { PlusIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline"

// Mock data
const users = [
  {
    name: "João Silva",
    email: "joao@example.com",
    role: "Admin",
    status: <Badge variant="default">{getText("status.active")}</Badge>,
    lastLogin: formatDate(new Date("2024-01-15")),
    createdAt: formatDate(new Date("2024-01-01")),
  },
  {
    name: "Maria Santos",
    email: "maria@example.com",
    role: "Editor",
    status: <Badge variant="default">{getText("status.active")}</Badge>,
    lastLogin: formatDate(new Date("2024-01-14")),
    createdAt: formatDate(new Date("2024-01-02")),
  },
  {
    name: "Pedro Costa",
    email: "pedro@example.com",
    role: "Viewer",
    status: <Badge variant="secondary">{getText("status.inactive")}</Badge>,
    lastLogin: formatDate(new Date("2024-01-10")),
    createdAt: formatDate(new Date("2024-01-03")),
  },
]

const userColumns = [
  { key: "name", label: getText("users.name") },
  { key: "email", label: getText("users.email") },
  { key: "role", label: getText("users.role") },
  { key: "status", label: getText("status.active") },
  { key: "lastLogin", label: getText("users.lastLogin") },
  { key: "createdAt", label: getText("users.createdAt") },
]

export default function UsersPage() {
  return (
    <DashboardLayout>
      <PageHeader
        title={getText("users.title")}
        subtitle={getText("users.subtitle")}
        action={
          <Button>
            <PlusIcon className="mr-2 h-4 w-4" />
            {getText("users.addUser")}
          </Button>
        }
      />

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input placeholder={getText("users.searchPlaceholder")} className="pl-10" />
        </div>
      </div>

      {/* Users table */}
      <DataTable columns={userColumns} data={users} emptyMessage={getText("users.noUsers")} />
    </DashboardLayout>
  )
}
