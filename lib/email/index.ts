// Main email exports - this is the primary entry point
export * from './email';

// Individual email type exports for direct access
export { sendVerificationEmail } from './sign-up-verification/send-verification-email';
export { sendPasswordResetEmail } from './password-reset/send-password-reset-email';
export { sendWelcomeEmail } from './welcome/send-welcome-email';
export { sendMagicLinkEmail } from './magic-link/send-magic-link-email';

// OTP email exports
export { sendOTPSignInEmail } from './otp-signin/send-otp-signin-email';
export { sendOTPEmailVerification } from './otp-email-verification/send-otp-email-verification';
export { sendOTPForgetPasswordEmail } from './otp-forget-password/send-otp-forget-password-email';

// Template exports for advanced usage
export { generateVerificationEmailHtml } from './sign-up-verification/template-html';
export { generateVerificationEmailText } from './sign-up-verification/template-text';
export { generatePasswordResetEmailHtml } from './password-reset/template-html';
export { generatePasswordResetEmailText } from './password-reset/template-text';
export { generateWelcomeEmailHtml } from './welcome/template-html';
export { generateWelcomeEmailText } from './welcome/template-text';
export { generateMagicLinkEmailHtml } from './magic-link/template-html';
export { generateMagicLinkEmailText } from './magic-link/template-text';

// OTP template exports
export { generateOTPSignInEmailHtml } from './otp-signin/template-html';
export { generateOTPSignInEmailText } from './otp-signin/template-text';
export { generateOTPEmailVerificationHtml } from './otp-email-verification/template-html';
export { generateOTPEmailVerificationText } from './otp-email-verification/template-text';
export { generateOTPForgetPasswordEmailHtml } from './otp-forget-password/template-html';
export { generateOTPForgetPasswordEmailText } from './otp-forget-password/template-text';

// Type exports
export type { VerificationEmailData } from './sign-up-verification/types';
export type { ResetPasswordEmailData } from './password-reset/types';
export type { WelcomeEmailData } from './welcome/types';
export type { MagicLinkEmailData } from './magic-link/types';

// OTP type exports
export type { OTPSignInData } from './otp-signin/types';
export type { OTPEmailVerificationData } from './otp-email-verification/types';
export type { OTPForgetPasswordData } from './otp-forget-password/types';
