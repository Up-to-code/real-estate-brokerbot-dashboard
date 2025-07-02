import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Properties | Dashboard",
  description: "Manage your property listings",
}

export default function PropertiesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
} 