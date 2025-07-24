// components/AdminOnly.tsx
import { currentUser } from "@clerk/nextjs/server"
import { prisma } from "@/lib/db"
import React from "react"

export default async function AdminOnly({ children }: { children: React.ReactNode }) {
  const clerkUser = await currentUser()

  if (!clerkUser || !clerkUser.emailAddresses?.[0]?.emailAddress) {
    return <NoAccess />
  }

  const email = clerkUser.emailAddresses[0].emailAddress

  let dbUser = await prisma.user.findUnique({
    where: { email },
  })

  if (!dbUser) {
    dbUser = await prisma.user.create({
      data: {
        email,
        name: clerkUser.firstName || "",
        role: "USER", // default role
      },
    })
  }

  if (dbUser.role !== "ADMIN") {
    return <NoAccess />
  }

  return <>{children}</>
}

function NoAccess() {
  return (
    <div className="w-full p-6 text-center text-red-600 border border-red-300 bg-red-50 rounded-xl mt-6">
      ❌ You do not have permission to view this content.
    </div>
  )
}
