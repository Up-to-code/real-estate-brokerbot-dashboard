import type React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import AdminOnly from "@/components/layout/AdminOnly";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={"ar"} dir={"rtl"} className={"font-cairo"}>
      <body>
        <ClerkProvider>
          <AdminOnly>{children}</AdminOnly>
        </ClerkProvider>
      </body>
    </html>
  );
}
