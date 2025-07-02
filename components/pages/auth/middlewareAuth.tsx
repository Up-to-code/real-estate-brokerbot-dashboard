import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

async function MiddlewareAuth() {
    // const { userId } = await auth();
    // const user = await currentUser();
    // const isSignedIn = !!userId;
    
    // // Get pathname from headers instead of usePathname hook
    // const headersList = await headers();
    // const pathname = headersList.get('x-pathname') || '/';
    
    // // Don't run auth checks on these pages to prevent loops
    // const excludedPaths = ["/sign-in", "/sign-up", "/no-permission"];
    // if (excludedPaths.includes(pathname)) {
    //     return null;
    // }
    
    // // Redirect unauthenticated users to sign-in
    // if (!isSignedIn) {
    //     redirect("/sign-in");
    // }
    
    // // Check admin role for authenticated users
    // if (isSignedIn && user?.publicMetadata?.role !== "admin") {
    //     redirect("/no-permission");
    // }
    
    // console.log("User role:", user?.publicMetadata?.role);
    
    return null;
}

export default MiddlewareAuth;