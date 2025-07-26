"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getText, formatNumber } from "@/lib/text-content";
import {
  EyeIcon,
  CursorArrowRaysIcon,
  ClockIcon,
  ArrowTrendingDownIcon,
} from "@heroicons/react/24/outline";
import {
  BarChart3,
  TrendingUp,
  Users,
  Globe,
  Activity,
  PieChart,
} from "lucide-react";

const analyticsStats = [
  {
    title: getText("analytics.visitors"),
    value: 12543,
    change: { value: "+15%", type: "increase" as const },
    icon: EyeIcon,
  },
  {
    title: getText("analytics.pageViews"),
    value: 45678,
    change: { value: "+8%", type: "increase" as const },
    icon: CursorArrowRaysIcon,
  },
  {
    title: getText("analytics.bounceRate"),
    value: 32,
    change: { value: "-5%", type: "decrease" as const },
    icon: ArrowTrendingDownIcon,
    suffix: "%",
  },
  {
    title: getText("analytics.avgSessionDuration"),
    value: 225, // 3m 45s in seconds
    change: { value: "+12%", type: "increase" as const },
    icon: ClockIcon,
    formatter: (value: number) => {
      const minutes = Math.floor(value / 60);
      const seconds = value % 60;
      return `${minutes}m ${seconds}s`;
    },
  },
];

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <PageHeader
        title={getText("analytics.title")}
        subtitle={getText("analytics.subtitle")}
      />

      {/* Enhanced Analytics Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {analyticsStats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            icon={<stat.icon className="h-5 w-5" />}
            suffix={stat.suffix}
            formatter={stat.formatter}
          />
        ))}
      </div>

      {/* Enhanced Charts Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Trends Chart */}
        <Card className="card-enhanced">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              {getText("analytics.trends")}
            </CardTitle>
            <div className="flex items-center text-sm text-muted-foreground">
              <TrendingUp className="h-4 w-4 mr-1" />
              +12% this month
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex h-64 items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg border border-border/50">
              <div className="text-center space-y-2">
                <BarChart3 className="h-12 w-12 text-primary/40 mx-auto" />
                <p className="text-muted-foreground font-medium">Analytics Trends Chart</p>
                <p className="text-sm text-muted-foreground">Interactive chart coming soon</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Traffic Sources Chart */}
        <Card className="card-enhanced">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <PieChart className="h-5 w-5 text-secondary" />
              {getText("analytics.trafficSources")}
            </CardTitle>
            <div className="flex items-center text-sm text-muted-foreground">
              <Globe className="h-4 w-4 mr-1" />
              5 sources
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex h-64 items-center justify-center bg-gradient-to-br from-secondary/5 to-success/5 rounded-lg border border-border/50">
              <div className="text-center space-y-2">
                <PieChart className="h-12 w-12 text-secondary/40 mx-auto" />
                <p className="text-muted-foreground font-medium">Traffic Sources Chart</p>
                <p className="text-sm text-muted-foreground">Interactive chart coming soon</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Analytics Insights */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="card-enhanced">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Top Performing Pages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { page: "/properties", views: 1234, change: "+15%" },
                { page: "/dashboard", views: 987, change: "+8%" },
                { page: "/analytics", views: 654, change: "+23%" },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
                  <div>
                    <p className="font-medium text-sm">{item.page}</p>
                    <p className="text-xs text-muted-foreground">{formatNumber(item.views)} views</p>
                  </div>
                  <div className="text-xs font-medium text-success">{item.change}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="card-enhanced">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Activity className="h-5 w-5 text-secondary" />
              Real-time Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { activity: "New property listed", time: "2 min ago" },
                { activity: "Client inquiry received", time: "5 min ago" },
                { activity: "Report generated", time: "12 min ago" },
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3 py-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.activity}</p>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="card-enhanced">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Globe className="h-5 w-5 text-success" />
              Geographic Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { country: "United States", percentage: 45, visitors: 5643 },
                { country: "Canada", percentage: 25, visitors: 3127 },
                { country: "United Kingdom", percentage: 18, visitors: 2254 },
                { country: "Others", percentage: 12, visitors: 1519 },
              ].map((item, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{item.country}</span>
                    <span className="text-muted-foreground">{item.percentage}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-muted-foreground">{formatNumber(item.visitors)} visitors</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}