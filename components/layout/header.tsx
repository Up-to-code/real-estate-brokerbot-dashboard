"use client";

import { Sidebar } from "./sidebar";
 import { BellIcon } from "@heroicons/react/24/outline";
 
export function Header() {
  return (
    <div
      dir="rtl"
      className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-border bg-background px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8"
    >
      {/* زر القائمة الجانبية للموبايل */}
      <div className="lg:hidden">
        <Sidebar />
      </div>

      {/* البحث */}
      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
 
      </div>

      {/* الجهة اليسرى (الإشعارات + المستخدم) */}
      <div className="flex items-center gap-x-4 lg:gap-x-6">
         
        {/* زر الإشعارات */}
        <button
          type="button"
          className="-m-2.5 p-2.5 text-muted-foreground hover:text-foreground"
        >
          <BellIcon className="h-6 w-6" />
        </button>

        {/* المستخدم */}
        <div className="relative">
          <button
            type="button"
            className="-m-1.5 flex items-center p-1.5"
          >
            <div className="h-8 w-8 rounded-full bg-muted"></div>
          </button>
        </div>
      </div>
    </div>
  );
}
