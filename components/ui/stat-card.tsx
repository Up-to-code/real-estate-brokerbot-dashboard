  "use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";
import { formatNumber } from "@/lib/text-content";

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  change?: {
    value: string;
    type: "increase" | "decrease";
  };
  suffix?: string;
  formatter?: (value: number) => string;
  className?: string;
}

export function StatCard({ 
  title, 
  value, 
  icon, 
  change, 
  suffix, 
  formatter,
  className 
}: StatCardProps) {
  const formattedValue = formatter ? formatter(value) : formatNumber(value) + (suffix || "");
  
  return (
    <Card className={cn(
      "card-enhanced group cursor-pointer transition-all duration-300 hover:shadow-lg",
      className
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex flex-col space-y-1">
            <div className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
              {formattedValue}
            </div>
            {change && (
              <div className={cn(
                "flex items-center text-xs font-medium",
                change.type === "increase" 
                  ? "text-success" 
                  : "text-destructive"
              )}>
                {change.type === "increase" ? (
                  <TrendingUp className="mr-1 h-3 w-3" />
                ) : (
                  <TrendingDown className="mr-1 h-3 w-3" />
                )}
                {change.value}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}