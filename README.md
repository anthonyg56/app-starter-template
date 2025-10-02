# Complete Authentication System with Better-Auth

A fully-featured authentication system built with Next.js, TypeScript, Better-Auth, and Tailwind CSS. Includes sign-in, sign-up, password reset, and OAuth integration.

## Features

- ✅ **Sign In Page** (`/sign-in`) - Email/password and OAuth authentication
- ✅ **Sign Up Page** (`/sign-up`) - Account creation with validation
- ✅ **Forgot Password** (`/forgot`) - Password reset email flow
- ✅ **Reset Password** (`/reset`) - Secure password reset with tokens
- ✅ **OAuth Integration** - Google and GitHub authentication
- ✅ **Session Management** - Secure session handling with Better-Auth
- ✅ **Form Validation** - Real-time validation with error feedback
- ✅ **Responsive Design** - Mobile-first responsive layout
- ✅ **TypeScript** - Full type safety throughout

## Auth Routes

| Route | Description |
|-------|-------------|
| `/sign-in` | Sign in with email/password or OAuth |
| `/sign-up` | Create new account with full validation |
| `/forgot` | Request password reset email |
| `/reset` | Reset password with token from email |
| `/dashboard` | Protected dashboard with session management (in `(protected)` route group) |

## Setup Instructions

### 1. Install Dependencies

\`\`\`bash
npm install better-auth @better-auth/next-js
\`\`\`

### 2. Environment Variables

Create a `.env.local` file in your project root:

\`\`\`env
# Better Auth Configuration
BETTER_AUTH_SECRET=your_better_auth_secret_here_generate_a_random_string
BETTER_AUTH_URL=http://localhost:3000
DATABASE_URL=file:./auth.db

# OAuth Configuration
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
GITHUB_CLIENT_ID=your_github_client_id_here
GITHUB_CLIENT_SECRET=your_github_client_secret_here

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
\`\`\`

### 3. Database Setup

Better-Auth requires a database to store user data and sessions. The default configuration uses SQLite:

\`\`\`bash
# The database will be automatically created when you first run the app
npm run dev
\`\`\`

For production, consider using PostgreSQL, MySQL, or another supported database by updating the `DATABASE_URL` and database provider in `lib/auth.ts`.

### 4. OAuth Setup

#### Google OAuth Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`

#### GitHub OAuth Setup
1. Go to GitHub Settings > Developer settings > OAuth Apps
2. Create a new OAuth App
3. Set Authorization callback URL: `http://localhost:3000/api/auth/callback/github`

### 5. Generate Better-Auth Secret

Generate a secure random string for `BETTER_AUTH_SECRET`:

\`\`\`bash
# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Or use any secure random string generator
\`\`\`

## Better-Auth Features

This implementation leverages Better-Auth's powerful features:

- **Unified API** - Single endpoint handles all authentication flows
- **Built-in Security** - CSRF protection, secure sessions, and more
- **OAuth Integration** - Simplified OAuth setup with multiple providers
- **Session Management** - Automatic session handling and refresh
- **Type Safety** - Full TypeScript support with inferred types
- **Database Agnostic** - Works with SQLite, PostgreSQL, MySQL, and more

## Authentication Flow

### Email/Password Authentication
1. User submits credentials via sign-in or sign-up form
2. Better-Auth validates and creates/authenticates user
3. Session is automatically created and managed
4. User is redirected to dashboard with active session

### OAuth Authentication
1. User clicks OAuth provider button
2. Better-Auth redirects to provider's authorization page
3. Provider redirects back with authorization code
4. Better-Auth exchanges code for user information
5. User account is created/linked and session established

### Password Reset
1. User requests password reset via forgot password form
2. Better-Auth sends secure reset email with token
3. User clicks link and is redirected to reset page
4. New password is set using the secure token

## Security Features

- **CSRF Protection** - Built-in CSRF token validation
- **Secure Sessions** - HTTP-only cookies with proper security headers
- **Password Hashing** - Automatic secure password hashing
- **Rate Limiting** - Built-in protection against brute force attacks
- **Token Security** - Secure password reset and email verification tokens
- **OAuth Security** - Proper state validation and secure token exchange

## Customization

### Database Configuration
Update `lib/auth.ts` to change database provider:

\`\`\`typescript
export const auth = betterAuth({
  database: {
    provider: "postgresql", // or "mysql", "sqlite"
    url: process.env.DATABASE_URL,
  },
  // ... other config
})
\`\`\`

### Adding OAuth Providers
Add new providers in `lib/auth.ts`:

\`\`\`typescript
socialProviders: {
  google: { /* config */ },
  github: { /* config */ },
  discord: { /* add new provider */ },
}
\`\`\`

### Custom Validation
Better-Auth handles most validation automatically, but you can add custom validation in the form components.

## Production Deployment

Before deploying to production:

1. **Database**: Set up a production database (PostgreSQL recommended)
2. **Environment Variables**: Update all environment variables for production
3. **OAuth Apps**: Configure OAuth apps with production callback URLs
4. **Security**: Ensure `BETTER_AUTH_SECRET` is a strong, unique value
5. **Email Service**: Configure email provider for password resets (if needed)
6. **Domain**: Update `BETTER_AUTH_URL` and `NEXT_PUBLIC_APP_URL` to production domain

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Authentication**: Better-Auth
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Database**: SQLite (development) / PostgreSQL (production)
- **Icons**: Lucide React

## Better-Auth Documentation

For more advanced configuration and features, visit the [Better-Auth documentation](https://better-auth.com).

## License

MIT License - feel free to use this in your projects!
