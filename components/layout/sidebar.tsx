"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { t } from "@/lib/i18n";
import {
  HomeIcon,
  ChartBarIcon,
  UserGroupIcon,
  CubeIcon,
  ShoppingCartIcon,
  CogIcon,
  XMarkIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  MegaphoneIcon,
  UsersIcon,
  BuildingOffice2Icon,
} from "@heroicons/react/24/outline";

const navigationItems = [
  { name: t("navigation.dashboard"), href: "/", icon: HomeIcon },
  { name: t("navigation.aiTraining"), href: "/ai-training", icon: ChatBubbleLeftRightIcon },
  { name: t("navigation.templates"), href: "/templates", icon: DocumentTextIcon },
  { name: t("navigation.campaigns"), href: "/campaigns", icon: MegaphoneIcon },
  { name: t("navigation.clients"), href: "/clients", icon: UsersIcon },
  { name: t("navigation.properties"), href: "/properties", icon: BuildingOffice2Icon },
  { name: t("navigation.analytics"), href: "/analytics", icon: ChartBarIcon },
  { name: t("navigation.users"), href: "/users", icon: UserGroupIcon },
    { name: t("navigation.settings"), href: "/settings", icon: CogIcon },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  const SidebarContent = () => (
    <div className="flex h-full flex-col" dir="rtl">
      {/* Logo */}
      <div className="flex h-16 shrink-0 items-center border-b border-gray-200 px-6">
        <h1 className="text-xl font-bold text-gray-900">{t("app.title")}</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsMobileOpen(false)}
              className={cn(
                "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary  text-foreground"
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <item.icon
                className={cn(
                  "ml-3 h-5 w-5 flex-shrink-0",
                  isActive
                    ? "text-foreground"
                    : "text-gray-400 group-hover:text-gray-500"
                )}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* User section */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center">
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700">Admin User</p>
            <p className="text-xs text-gray-500">admin@example.com</p>
          </div>
          <div className="h-8 w-8 rounded-full bg-gray-300"></div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile sidebar (RTL: slide from right) */}
      {isMobileOpen && (
        <div className="relative z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-gray-900/80"
            onClick={() => setIsMobileOpen(false)}
          />
          <div className="fixed inset-0 flex justify-end">
            <div className="relative ml-16 flex w-full max-w-xs flex-1">
              <div className="absolute right-full top-0 flex w-16 justify-center pt-5">
                <button
                  type="button"
                  className="-m-2.5 p-2.5"
                  onClick={() => setIsMobileOpen(false)}
                >
                  <XMarkIcon className="h-6 w-6 text-white" />
                </button>
              </div>
              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white">
                <SidebarContent />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop fixed sidebar */}
      <div
        className={cn(
          "hidden lg:fixed lg:inset-y-0 lg:right-0 lg:z-40 lg:flex lg:w-72 lg:flex-col h-screen",
          className
        )}
      >
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-l border-gray-200 bg-white">
          <SidebarContent />
        </div>
      </div>
    </>
  );
}
