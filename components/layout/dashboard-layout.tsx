"use client";

import type React from "react";
import { Sidebar } from "./sidebar";
import { Header } from "./header";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background font-inter flex transition-colors duration-300">
      {/* Enhanced Sidebar with improved styling */}
      <Sidebar />

      {/* Main content area with better spacing and responsive design */}
      <div className="flex flex-col flex-1 lg:mr-72 min-h-screen">
        <Header />

        <main className="flex-1 py-6 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-7xl">
            <div className="space-y-6">
              {children}
            </div>
          </div>
        </main>
        
        {/* Footer for better visual balance */}
        <footer className="border-t border-border/50 py-4 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs text-muted-foreground text-center">
              © 2024 Real Estate Broker Bot Dashboard. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
