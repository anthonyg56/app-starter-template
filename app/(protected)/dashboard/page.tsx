"use client"

import { useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"
import { useSession } from "@/lib/clients/auth-client"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useSignOutMutation } from "@/lib/hooks/use-auth-mutations"
import { useAuth } from "@/lib/providers/auth-provider"
import { H1, H2, P, Muted } from "@/components/ui/typography"

export default function DashboardPage() {
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const { data: session, isPending } = useSession()
  const router = useRouter()
  const signOutMutation = useSignOutMutation()
  const { user, setUser } = useAuth()

  useEffect(() => {
    if (searchParams.get("oauth_success")) {
      toast({
        title: "Success",
        description: "You have been signed in successfully with OAuth.",
      })
    }
  }, [searchParams, toast])

  useEffect(() => {
    if (session?.user && !user) {
      setUser(session.user)
    }
  }, [session, user, setUser])

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/sign-in")
    }
  }, [session, isPending, router])

  const handleSignOut = () => {
    signOutMutation.mutate()
  }

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="text-center">
          <Muted>Loading...</Muted>
        </div>
      </div>
    )
  }

  if (!session) {
    return null // Will redirect to sign-in
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <H1 className="text-3xl font-bold">Dashboard</H1>
          <Muted>Welcome back, {session.user.name || session.user.email}!</Muted>
        </div>

        <div className="space-y-4 p-6 border rounded-lg bg-card">
          <H2 className="text-xl font-semibold">User Information</H2>
          <div className="space-y-2 text-sm">
            <P>
              <strong>Name:</strong> {session.user.name || "Not provided"}
            </P>
            <P>
              <strong>Email:</strong> {session.user.email}
            </P>
            <P>
              <strong>User ID:</strong> {session.user.id}
            </P>
          </div>
        </div>

        <Button onClick={handleSignOut} variant="outline" disabled={signOutMutation.isPending}>
          {signOutMutation.isPending ? "Signing out..." : "Sign Out"}
        </Button>
      </div>
    </div>
  )
}
