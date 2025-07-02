"use client";

import type React from "react";
import { Sidebar } from "./sidebar";
import { Header } from "./header";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 font-cairo flex ">
      {/* Sidebar ثابت على اليمين (بسبب flex-row-reverse) */}
      <Sidebar />

      {/* المحتوى الرئيسي مع ترك مساحة جانبية للـ Sidebar */}
      <div className="flex flex-col flex-1 lg:mr-72">
        <Header />

        <main className="py-6 flex-1">
          <div className="mx-auto w-full px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
