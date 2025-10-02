// Re-export all email functions and types from their respective modules
export { sendVerificationEmail } from './sign-up-verification/send-verification-email';
export { sendPasswordResetEmail } from './password-reset/send-password-reset-email';
export { sendWelcomeEmail } from './welcome/send-welcome-email';
export { sendMagicLinkEmail } from './magic-link/send-magic-link-email';

// Re-export all types
export type { VerificationEmailData } from './sign-up-verification/types';
export type { ResetPasswordEmailData } from './password-reset/types';
export type { WelcomeEmailData } from './welcome/types';
export type { MagicLinkEmailData } from './magic-link/types';

