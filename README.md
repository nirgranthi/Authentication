This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

# Login Page
- Takes either username or email
- Sends a "Login detected" email to the user(coming soon...)

# Signup Page
- Sends verification email, click-to-verify format using a token(expire in 10 min)
- Checks if password is valid and username is of valid English character

# Forgot Password Page(coming soon...)
- 

# Verification
- Verifies through a unique generated token
- Can resend if token expires before verifying(coming soon...)