import { getText, formatNumber, formatCurrency } from "@/lib/text-content"
import { UserGroupIcon, CubeIcon, ShoppingCartIcon, CurrencyDollarIcon } from "@heroicons/react/24/outline"
import { StatCard } from "./stat-card"

const stats = [
  {
    title: getText("dashboard.totalUsers"),
    value: formatNumber(1234),
    change: { value: "+12%", type: "increase" as const },
    icon: UserGroupIcon,
  },
  {
    title: getText("dashboard.totalProducts"),
    value: formatNumber(567),
    change: { value: "+5%", type: "increase" as const },
    icon: CubeIcon,
  },
  {
    title: getText("dashboard.totalOrders"),
    value: formatNumber(89),
    change: { value: "-3%", type: "decrease" as const },
    icon: ShoppingCartIcon,
  },
  {
    title: getText("dashboard.revenue"),
    value: formatCurrency(45678),
    change: { value: "+18%", type: "increase" as const },
    icon: CurrencyDollarIcon,
  },
]

export function StatsGrid() {
  return (
    <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <StatCard key={index} title={stat.title} value={stat.value} change={stat.change} icon={stat.icon} />
      ))}
    </div>
  )
} 