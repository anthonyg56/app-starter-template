import { betterAuth } from "better-auth"
import { emailOTP, username } from "better-auth/plugins"
import { nextCookies } from "better-auth/next-js"
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { isProduction } from "../utils/utils"
import { db } from "./db";
import { sendVerificationEmail, sendPasswordResetEmail, sendWelcomeEmail, sendMagicLinkEmail } from "../email/email";
import { account, session, user, verification } from "@/lib/database/schema";
import { sendOTPEmailVerification, sendOTPForgetPasswordEmail } from "../email";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user,
      session,
      account,
      verification,
    }
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  plugins: [
    nextCookies(),
    username({
      
    }),
    emailOTP({
      otpLength: 6,
      sendVerificationOnSignUp: true,
      sendVerificationOTP: async ({ email, type, otp }) => {
        if (type === "email-verification") {
          sendOTPEmailVerification({
            to: email,
            otp,
          });
        } else if (type === "forget-password") {
          sendOTPForgetPasswordEmail({
            to: email,
            otp,
          });
        }
      },
    }),
  ],
  secret: process.env.BETTER_AUTH_SECRET as string,
  baseURL: process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_APP_URL,
  // Email configuration
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: isProduction,
    sendEmailVerification: async ({ user, verificationUrl }: { user: any; verificationUrl: string }) => {
      try {
        await sendVerificationEmail({
          to: user.email,
          verificationUrl,
          userName: user.name || undefined,
        });
      } catch (error) {
        console.error('Failed to send verification email:', error);
        throw error;
      }
    },
    sendPasswordReset: async ({ user, resetUrl }: { user: any; resetUrl: string }) => {
      try {
        await sendPasswordResetEmail({
          to: user.email,
          resetUrl,
          userName: user.name || undefined,
        });
      } catch (error) {
        console.error('Failed to send password reset email:', error);
        throw error;
      }
    },
    sendWelcomeEmail: async ({ user, loginUrl }: { user: any; loginUrl: string }) => {
      try {
        await sendWelcomeEmail({
          to: user.email,
          userName: user.name || 'User',
          loginUrl,
        });
      } catch (error) {
        console.error('Failed to send welcome email:', error);
        // Don't throw here as welcome email is not critical
      }
    },
  },
  // Magic link configuration
  magicLink: {
    enabled: true,
    sendMagicLink: async ({ user, magicLink }: { user: any; magicLink: string }) => {
      try {
        await sendMagicLinkEmail({
          to: user.email,
          magicLink,
          userName: user.name || undefined,
        });
      } catch (error) {
        console.error('Failed to send magic link email:', error);
        throw error;
      }
    },
  },
})
