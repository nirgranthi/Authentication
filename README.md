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


# Login Page
- Takes either username or email
- Sends a "Login detected" email to the user(coming soon...)

# Signup Page
- Sends verification email, click-to-verify format using a token(expire in 10 min)
- Checks if password is valid and username is of valid English character

# Forgot Password Page(coming soon...)
- If the user has phone number, it verifies through OTP then asks for new password
- else through email, by unique token

# Verification
- Verifies through a unique generated token
- Can resend if token expires before verifying(coming soon...)
- OTP for Phone numbers

# Features
- # Modular Components:-
- I've made every major feature, modular, which means they can be detached and re-attached as easy as by commenting out two lines of codes.

- # Rate Limiting:-
- Supports rate limiting for the API endpoints

- # Multiple Login Providers:-
- Crendentials
- Google
- Apple
- Phone Numbers

- # Easy API Endpoints Guide
- API_ENDPOINTS.md lists all the API endpoints, in the format of
- - What they do
- - How to implement them
- - What there response looks like