import { auth } from "@/lib/clients/auth"

export type BetterAuthSession = typeof auth.$Infer.Session
export type BetterAuthUser = typeof auth.$Infer.Session.user