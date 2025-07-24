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
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    image: "https://via.placeholder.com/150",
    role: "Admin",
  };
  return (
    <DashboardLayout>
      <PageHeader
        title={getText("users.title")}
        subtitle={getText("users.subtitle")}
      />
      <div className="mt-8">
        {user ? (
          <div className="p-6 bg-white rounded shadow flex items-center gap-4">
            {user.image ? (
              <img src={user.image} alt="User avatar" className="h-16 w-16 rounded-full object-cover" />
            ) : (
              <div className="h-16 w-16 rounded-full bg-gray-300" />
            )}
            <div>
              <div className="text-lg font-bold">{user.name}</div>
              <div className="text-gray-600">{user.email}</div>
              <div className="text-gray-500 text-sm">{user.role}</div>
            </div>
          </div>
        ) : (
          <div className="text-gray-500">{getText("users.noUsers")}</div>
        )}
      </div>
    </DashboardLayout>
  );
}
