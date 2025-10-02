import type React from "react"
import { redirectIfAuthenticated } from "@/lib/utils/auth"
import { AuthLayoutContent } from "../../components/auth/auth-layout-content"
import LandingPageHeader from "@/components/landing-page-header"

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  // Redirect to dashboard if user is already authenticated
  await redirectIfAuthenticated();

  return (
    <>
      <LandingPageHeader />
      <AuthLayoutContent>
        {children}
      </AuthLayoutContent>
    </>
  );
};
