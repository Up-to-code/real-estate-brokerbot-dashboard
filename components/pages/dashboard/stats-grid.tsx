"use client";

import { useEffect } from "react";
 import { StatCard } from "@/components/ui/stat-card";
import { Users, MessageCircle, Zap, Activity } from "lucide-react";
import { useDashboardStore } from "@/store/useDashboardStore";
import { Skeleton } from "@/components/ui/skeleton";
 
export function StatsGrid() {
  const {
    totalClients,
    totalMessages,
    activeCampaigns,
    activeClients,
    loading,
    error,
    fetchDashboardData,
  } = useDashboardStore();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const stats = [
    { title: "إجمالي العملاء", value: totalClients, icon: Users },
    { title: "عدد الرسائل", value: totalMessages, icon: MessageCircle },
    { title: "الحملات النشطة", value: activeCampaigns, icon: Zap },
    { title: "العملاء النشطون", value: activeClients, icon: Activity },
  ];

  return (
    <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {loading
        ? Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="p-6 bg-white shadow rounded-lg space-y-3 animate-pulse"
            >
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-4 w-1/4" />
            </div>
          ))
        : stats.map((stat, i) => (
            <StatCard
              key={i}
              title={stat.title}
              value={stat.value}
              icon={<stat.icon className="w-6 h-6" />}
            />
          ))}
    </div>
  );
}
