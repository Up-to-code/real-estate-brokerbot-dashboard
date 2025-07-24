  "use client";

  import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
  import { Spinner } from "@/components/ui/Spinner";
  import { useDashboardStore } from "@/store/useDashboardStore";
  import { Users, MessageCircle, Zap, Activity } from "lucide-react";

  export function StatCard({ title, value, icon }: { title: string, value: number, icon: React.ReactNode }) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">{value}</div>
            {icon}
          </div>
        </CardContent>
      </Card>
    );
  }
  
  