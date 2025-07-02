import { getText } from "@/lib/text-content"

export function WelcomeMessage() {
  return (
    <div className="mb-8 rounded-lg bg-primary  p-6">
      <h2 className="text-lg font-medium text-blue-900">{getText("dashboard.welcomeMessage")}</h2>
      <p className="mt-1 text-sm text-foreground">{getText("dashboard.subtitle")}</p>
    </div>
  )
} 