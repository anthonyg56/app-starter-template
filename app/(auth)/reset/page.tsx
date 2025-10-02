import { Suspense } from "react"
import { ResetPasswordForm } from "@/components/auth/forms/reset-password-form"
import { OTP_VERIFICATION_TYPES, OTPVerificationType } from "@/lib/constants/auth";
import { redirect } from "next/navigation";
import { PageProps } from "@/.next/types/app/(auth)/verify/page";

export default async function ResetPasswordPage({ searchParams }: PageProps) {
  const queryParams = await searchParams;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  )
}
