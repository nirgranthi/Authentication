### **Advanced Authentication & Identity Management System**

* **Hybrid Multi-Provider Authentication:** A robust NextAuth.js integration supporting standard credentials alongside Google and Apple OAuth 2.0 providers for users who can't remember another password.
* **Multi-Channel Identity Verification:** Implements a dual-layer security model featuring mandatory email verification with token expiration and SMS-based OTP authentication for mobile-first validation.
* **Comprehensive Password Recovery Suite:** A sophisticated "forgot password" flow allowing users to regain account access via secure email links or phone-based OTP verification.
* **Real-Time Identity Guardrails:** Server-side validation and asynchronous checks to ensure unique namespaces for usernames, emails, and phone numbers before a user even hits "Sign Up".
* **Infrastructure Security & Rate Limiting:** Includes intelligent request throttling to mitigate brute-force attacks and prevent your API from collapsing under the slightest bit of pressure.
* **Secure Credential Architecture:** Utilizes industry-standard bcrypt hashing for salt-and-pepper password storage, ensuring that even if your DB leaks, user secrets stay secret.
* **Persistent User Experience:** Features "Remember Me" functionality via local storage and dynamic, protected user profile routing.
* **Adaptive Theming & UI:** A fully responsive interface with system-aware Dark Mode support.
* **Production-Ready Tech Stack:** Architected with Next.js, TypeScript for type safety (mostly), and MongoDB for flexible, persistent data modeling.

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
- Alerts user if login is from a new device

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

## List of features lacking for Production Grade Quality
- Data integrity(schema checks):- zod or yup
- Logging:- it is logging to console.log for now
- Automated tests
- Multiple db calls
- Security headers(CSRF)