import { getText } from "@/lib/text-content"
import { UserGroupIcon, CubeIcon } from "@heroicons/react/24/outline"

export function QuickActions() {
  return (
    <div>
      <h3 className="mb-4 text-lg font-medium text-gray-900">{getText("dashboard.quickActions")}</h3>
      <div className="space-y-3">
        <button className="w-full rounded-lg bg-white p-4 text-left shadow hover:bg-gray-50">
          <div className="flex items-center">
            <UserGroupIcon className="h-6 w-6 text-gray-400" />
            <span className="ml-3 text-sm font-medium text-gray-900">{getText("users.addUser")}</span>
          </div>
        </button>
        <button className="w-full rounded-lg bg-white p-4 text-left shadow hover:bg-gray-50">
          <div className="flex items-center">
            <CubeIcon className="h-6 w-6 text-gray-400" />
            <span className="ml-3 text-sm font-medium text-gray-900">{getText("products.addProduct")}</span>
          </div>
        </button>
      </div>
    </div>
  )
} 