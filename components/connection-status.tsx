"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { apiService } from "@/lib/api-service"
import { WifiIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline"
import { t } from "@/lib/i18n"

export function ConnectionStatus() {
  const [isOnline, setIsOnline] = useState(true)
  const [isMockMode, setIsMockMode] = useState(false)
  const [isChecking, setIsChecking] = useState(false)

  useEffect(() => {
    const checkConnection = async () => {
      setIsMockMode(apiService.isMockMode())
    }

    checkConnection()

    // Listen for online/offline events
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  const handleRetryConnection = async () => {
    setIsChecking(true)
    try {
      await apiService.forceRealApi()
      setIsMockMode(apiService.isMockMode())
    } catch (error) {
      console.error("Failed to reconnect:", error)
    } finally {
      setIsChecking(false)
    }
  }

  if (!isOnline) {
    return (
      <Badge variant="destructive" className="flex items-center gap-1">
        <ExclamationTriangleIcon className="h-3 w-3" />
        {t("connection.offline")}
      </Badge>
    )
  }

  if (isMockMode) {
    return (
      <div className="flex items-center gap-2">
        <Badge variant="secondary" className="flex items-center gap-1">
          <ExclamationTriangleIcon className="h-3 w-3" />
          {t("connection.mockMode")}
        </Badge>
        <Button variant="outline" size="sm" onClick={handleRetryConnection} disabled={isChecking}>
          {isChecking ? t("connection.checking") : t("connection.retryConnection")}
        </Button>
      </div>
    )
  }

  return (
    <Badge variant="default" className="flex items-center gap-1">
      <WifiIcon className="h-3 w-3" />
      {t("connection.connected")}
    </Badge>
  )
}
