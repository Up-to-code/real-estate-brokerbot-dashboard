"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";
import { getText, formatNumber } from "@/lib/text-content";
import {
  EyeIcon,
  CursorArrowRaysIcon,
  ClockIcon,
  ArrowTrendingDownIcon,
} from "@heroicons/react/24/outline";

const analyticsStats = [
  {
    title: getText("analytics.visitors"),
    value: formatNumber(12543),
    change: { value: "+15%", type: "increase" as const },
    icon: EyeIcon,
  },
  {
    title: getText("analytics.pageViews"),
    value: formatNumber(45678),
    change: { value: "+8%", type: "increase" as const },
    icon: CursorArrowRaysIcon,
  },
  {
    title: getText("analytics.bounceRate"),
    value: "32%",
    change: { value: "-5%", type: "increase" as const },
    icon: ArrowTrendingDownIcon,
  },
  {
    title: getText("analytics.avgSessionDuration"),
    value: "3m 45s",
    change: { value: "+12%", type: "increase" as const },
    icon: ClockIcon,
  },
];

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <PageHeader
        title={getText("analytics.title")}
        subtitle={getText("analytics.subtitle")}
      />

      {/* Analytics Stats */}
      <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {analyticsStats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
             icon={stat.icon}
          />
        ))}
      </div>

      {/* Charts placeholder */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="mb-4 text-lg font-medium text-gray-900">
            {getText("analytics.trends")}
          </h3>
          <div className="flex h-64 items-center justify-center bg-gray-50">
            <p className="text-gray-500">Gráfico de tendências</p>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="mb-4 text-lg font-medium text-gray-900">
            {getText("analytics.trafficSources")}
          </h3>
          <div className="flex h-64 items-center justify-center bg-gray-50">
            <p className="text-gray-500">Gráfico de fontes de tráfego</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
