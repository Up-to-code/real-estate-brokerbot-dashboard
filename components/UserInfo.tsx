import { ReactNode } from "react";
import { withAuth } from "@workos-inc/authkit-nextjs";

const adminsEmails = ["133324agh@gmail.com"];

interface UserInfoWrapperProps {
  children: (props: { user: any; isAdmin: boolean }) => ReactNode;
  fallback?: ReactNode;
}

export default async function UserInfoWrapper({ children, fallback = <div>You are not signed in.</div> }: UserInfoWrapperProps) {
  const { user } = await withAuth();

  if (!user) {
    return <>{fallback}</>;
  }

  const isAdmin = adminsEmails.includes(user.email);
  return <>{children({ user, isAdmin })}</>;
} 