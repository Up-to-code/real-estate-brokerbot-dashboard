"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/ui/page-header";
import {
  WelcomeMessage,
  StatsGrid,
  DashboardStats,
  QuickActions,
} from "@/components/pages/dashboard";
import { getText } from "@/lib/text-content";
import { ChartDailyMessages } from "@/components/pages/dashboard/Chart";
 

export default function DashboardPage() {

  return (
    <DashboardLayout>
      <PageHeader
        title={getText("dashboard.title")}
        subtitle={getText("dashboard.subtitle") }
      />
      <WelcomeMessage />
      <StatsGrid />
      <ChartDailyMessages />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mt-6">
        <DashboardStats />
        <QuickActions />
      </div>
    </DashboardLayout>
  );
}
