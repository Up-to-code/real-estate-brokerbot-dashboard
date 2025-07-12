import type React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });
import { AuthKitProvider } from '@workos-inc/authkit-nextjs/components';
import UserInfoWrapper from "@/components/UserInfo";
import { redirect } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={"ar"} dir={"rtl"} className={"font-cairo"}>
      <body>
        <AuthKitProvider>
          <UserInfoWrapper >
            {({ user, isAdmin }) => {
              if (!isAdmin) {
                redirect("/no-permission");
              }
              return children;
            }}
          </UserInfoWrapper>
        </AuthKitProvider>
      </body>
    </html>
  );
}
