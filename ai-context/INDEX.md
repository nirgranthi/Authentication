# AI Context Index
Last updated: 2026-03-21

> **Agents: read this file before scraping any raw source.** If the file you need is listed here, read its context doc first.
> Follow `.agent/workflows/update_context.md` to keep this index in sync.

---

## API Routes

| Module | Source File | Context Doc | Last Updated |
|--------|------------|-------------|--------------|
| NextAuth Handler | `app/api/auth/[...nextauth]/route.ts` | `ai-context/api/auth.md` | 2026-03-21 |
| Signup Route | `app/api/signup/route.ts` | `ai-context/api/signup.md` | 2026-03-21 |
| Check User Exists | `app/api/checkUserExists/route.ts` | `ai-context/api/checkUserExists.md` | 2026-03-21 |
| Forgot Password | `app/api/forgotPassword/route.ts` | `ai-context/api/forgotPassword.md` | 2026-03-21 |
| Reset Password | `app/api/resetPassword/route.ts` | `ai-context/api/resetPassword.md` | 2026-03-21 |
| Resend Verification | `app/api/verification-email/resend/route.ts` | `ai-context/api/verification-resend.md` | 2026-03-21 |
| Verify Email | `app/api/verifyEmail/route.ts` | `ai-context/api/verifyEmail.md` | 2026-03-21 |

## Models

| Module | Source File | Context Doc | Last Updated |
|--------|------------|-------------|--------------|
| User Model | `models/user.ts` | `ai-context/models/user.md` | 2026-03-21 |

## Library Utilities

| Module | Source File | Context Doc | Last Updated |
|--------|------------|-------------|--------------|
| MongoDB Connector | `lib/mongodb.ts` | `ai-context/lib/mongodb.md` | 2026-03-21 |
| Password Reset Email | `lib/sendForgotPasswordEmail.ts` | `ai-context/lib/sendForgotPasswordEmail.md` | 2026-03-21 |
| Validation Logic | `lib/validation.ts` | `ai-context/lib/validation.md` | 2026-03-21 |
| Verification Trigger | `features/verification-email/triggerVerificationEmail.ts` | `ai-context/lib/triggerVerificationEmail.md` | 2026-03-21 |
| Verification Email | `features/verification-email/sendVerificationEmail.ts` | `ai-context/lib/sendVerificationEmail.md` | 2026-03-21 |

## Scripts

| Module | Source File | Context Doc | Last Updated |
|--------|------------|-------------|--------------|
| Password Encrypt | `app/scripts/encrypt.ts` | `ai-context/scripts/encrypt.md` | 2026-03-21 |

## Pages

| Module | Source File | Context Doc | Last Updated |
|--------|------------|-------------|--------------|
| Home Page | `app/page.tsx` | `ai-context/pages/home.md` | 2026-03-21 |
| Login Page | `app/login/page.tsx` | `ai-context/pages/login.md` | 2026-03-21 |
| Signup Page | `app/signup/page.tsx` | `ai-context/pages/signup.md` | 2026-03-21 |
| Forgot Password | `app/forgot-password/page.tsx` | `ai-context/pages/forgot-password.md` | 2026-03-21 |
| Reset Password | `app/reset-password/page.tsx` | `ai-context/pages/reset-password.md` | 2026-03-21 |
| Verify Email | `app/verify-email/page.tsx` | `ai-context/pages/verify-email.md` | 2026-03-21 |
| User Profile | `app/profile/[username]/page.tsx` | `ai-context/pages/profile.md` | 2026-03-21 |

## Hooks

| Module | Source File | Context Doc | Last Updated |
|--------|------------|-------------|--------------|
| Dark Mode Hook | `app/hooks/useDarkMode.ts` | `ai-context/hooks/useDarkMode.md` | 2026-03-21 |

## Components

| Module | Source File | Context Doc | Last Updated |
|--------|------------|-------------|--------------|
| Buttons | `app/components/Buttons.jsx` | `ai-context/components/Buttons.md` | 2026-03-21 |
| Providers | `app/components/Providers.tsx` | `ai-context/components/Providers.md` | 2026-03-21 |
| SVGs | `app/components/SVGs.jsx` | `ai-context/components/SVGs.md` | 2026-03-21 |
| Theme Provider | `app/components/ThemeProvider.tsx` | `ai-context/components/ThemeProvider.md` | 2026-03-21 |
