import type React from "react";
 import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/pages/auth/AuthProvider";
import MiddlewareAuth from "@/components/pages/auth/middlewareAuth";
const inter = Inter({ subsets: ["latin"] });

// Cairo font import via Google Fonts CDN in globals.css
// @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&display=swap');

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <html lang={"ar"} dir={"rtl"} className={"font-cairo"}>
        <body>
          <MiddlewareAuth />
            {children}
        
        </body>
      </html>
    </AuthProvider>

  );
}
