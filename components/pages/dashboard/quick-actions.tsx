import { getText } from "@/lib/text-content";
import { UserGroupIcon, CubeIcon } from "@heroicons/react/24/outline";

export function QuickActions() {
  const actions = [
    {
      icon: <UserGroupIcon className="h-5 w-5 text-white" />,
      label: getText("users.addUser"),
      bg: "bg-primary  0",
    },
    {
      icon: <CubeIcon className="h-5 w-5 text-white" />,
      label: getText("products.addProduct"),
      bg: "bg-green-500",
    },
  ];

  return (
    <div>
      <h3 className="mb-4 text-lg font-semibold text-gray-900">
        {getText("dashboard.quickActions")}
      </h3>
      <div className="space-y-3">
        {actions.map((action, i) => (
          <button
            key={i}
            className="w-full flex items-center gap-3 rounded-lg bg-white p-4 shadow-sm hover:shadow-md transition hover:bg-gray-50"
          >
            <div className={`p-2 rounded-full ${action.bg} shrink-0`}>
              {action.icon}
            </div>
            <span className="text-sm font-medium text-gray-900">
              {action.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
