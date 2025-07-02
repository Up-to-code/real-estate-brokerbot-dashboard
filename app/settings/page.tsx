"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"
import Image from "next/image"

export default function DevSettingsPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col items-center justify-center h-full py-12">
        <Card className="max-w-md w-full text-center">
          <CardHeader>
            <div className="flex items-center justify-center text-yellow-500 mb-4">
              <AlertTriangle className="h-10 w-10" />
            </div>
            <CardTitle className="text-2xl font-semibold">
              هذه الصفحة قيد التطوير 🚧
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              نحن نعمل على تحسين هذه الصفحة. عُد لاحقًا لرؤية التحديثات!
            </p>
            <Image
              src="/dog-dev.png"
              alt="Cute dog under construction"
              width={200}
              height={200}
              className="mx-auto rounded-md"
            />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
