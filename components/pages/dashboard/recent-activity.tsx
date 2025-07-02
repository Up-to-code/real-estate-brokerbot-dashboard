"use client";

import { useEffect } from "react";
import { useDashboardStore } from "@/store/useDashboardStore";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/Spinner";

export function DashboardStats() {
  const {
    recentMessages,
    loading,
    error,
    fetchDashboardData,
  } = useDashboardStore();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) return <Spinner />;

  if (error)
    return (
      <div className="text-red-500 text-center font-semibold mt-4">
        حدث خطأ: {error}
      </div>
    );

  return (
    <div className="grid gap-6">
      {/* آخر الرسائل */}
      <Card>
        <CardHeader>
          <CardTitle>📨 آخر الرسائل</CardTitle>
        </CardHeader>
        <CardContent>
          {recentMessages.length === 0 ? (
            <p className="text-gray-500">لا توجد رسائل</p>
          ) : (
            <ul className="list-disc pl-5 space-y-1">
              {recentMessages.slice(0, 5).map((msg, i) => (
                <li key={i} className="text-sm text-gray-700">
                  {typeof msg === "string"
                    ? msg
                    : msg?.text || msg?.message || JSON.stringify(msg)}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
