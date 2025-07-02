import { getText } from "@/lib/text-content"
import { DataTable } from "./data-table"

const recentActivity = [
  {
    user: "João Silva",
    action: "Criou novo produto",
    time: "2 horas atrás",
  },
  {
    user: "Maria Santos",
    action: "Atualizou pedido #1234",
    time: "4 horas atrás",
  },
  {
    user: "Pedro Costa",
    action: "Adicionou novo usuário",
    time: "6 horas atrás",
  },
]

const activityColumns = [
  { key: "user", label: "Usuário" },
  { key: "action", label: "Ação" },
  { key: "time", label: "Tempo" },
]

export function RecentActivity() {
  return (
    <div>
      <h3 className="mb-4 text-lg font-medium text-gray-900">{getText("dashboard.recentActivity")}</h3>
      <DataTable columns={activityColumns} data={recentActivity} emptyMessage={getText("dashboard.noData")} />
    </div>
  )
} 