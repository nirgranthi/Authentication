# API Endpoints Guide

This document provides a comprehensive guide to all API endpoints available in the application, organized by functionality.

---

## 🔐 1. Authentication (NextAuth.js)

### `GET/POST /api/auth/[...nextauth]`
- **What it does**: Handles all authentication-related requests including sign-in... Also captures and verifies `User-Agent` to track devices and sends an Email/SMS alert for new logins.
- **How to implement**: Use `next-auth` hooks like `signIn()`, `signOut()`, or `useSession()` on the client side.
- **Response**: Varies by action (e.g., set-cookie for sessions, JSON for session info).

---

## 📝 2. User Registration & Verification

### `POST /api/signup`
- **What it does**: Registers a new user with email, username, and password. It hashes the password, creates the user in MongoDB, captures the initial device `User-Agent`, and triggers a verification email.
- **How to implement**:
  - **Body**: `{ "email": "string", "username": "string", "password": "password" }`
- **Response**:
  - `201 Created`: `{ "message": "User Registered. Please check your email to verify your account." }`
  - `400/409/500 Errors`: `{ "message": "Error details" }`

### `GET /api/verifyEmail`
- **What it does**: Verifies a user's email address using a token sent via email.
- **How to implement**:
  - **Query Params**: `?token=YOUR_TOKEN`
- **Response**:
  - `302 Redirect`: Redirects to `/login?verified=true` on success.
  - `400 Bad Request`: `{ "message": "Invalid or expired verification token." }`

### `POST /api/verification-email/resend`
- **What it does**: Resends the verification email to a registered but unverified user.
- **How to implement**:
  - **Body**: `{ "email": "string" }` or `{ "username": "string" }`
- **Response**:
  - `200 OK`: `{ "message": "Verification email sent successfully" }`
  - `400/404 Errors`: `{ "message": "Error details" }`

---

## 🔑 3. Password Management

### `POST /api/forgotPassword` (Email-based)
- **What it does**: Initiates the password recovery flow for users who registered via email. Generates a reset token and sends it via email.
- **How to implement**:
  - **Body**: `{ "email": "string" }`
- **Response**:
  - `200 OK`: `{ "message": "If an account with that email exists, we sent you a password reset link." }`

### `POST /api/forgotPassword/phone/verify-otp` (Phone-based)
- **What it does**: Verifies the OTP sent to a phone number during the password recovery flow and returns a password reset token.
- **How to implement**:
  - **Body**: `{ "phone": "+91XXXXXXXXXX", "otp": "123456" }`
- **Response**:
  - `200 OK`: `{ "message": "OTP verified successfully.", "token": "uuid-token" }`
  - `400/404 Errors`: `{ "message": "Error details" }`

### `POST /api/resetPassword`
- **What it does**: Resets the user's password using a valid reset token (obtained via email link or phone OTP verification).
- **How to implement**:
  - **Body**: `{ "token": "string", "newPassword": "string" }`
- **Response**:
  - `200 OK`: `{ "message": "Your password has been successfully reset." }`
  - `400 Error`: `{ "message": "Invalid or expired password reset token." }`

---

## 🔍 4. Identity & Availability Checks

### `POST /api/check/email`
- **What it does**: Checks if an email is already registered in the database.
- **How to implement**:
  - **Body**: `{ "email": "string" }`
- **Response**: `{ "exists": boolean }`

### `POST /api/check/username`
- **What it does**: Checks if a username is already taken.
- **How to implement**:
  - **Body**: `{ "username": "string" }`
- **Response**: `{ "exists": boolean }`

### `POST /api/check/phone`
- **What it does**: Checks if a phone number is already registered.
- **How to implement**:
  - **Body**: `{ "phone": "string" }`
- **Response**: `{ "exists": boolean }`

### `POST /api/checkUserExists`
- **What it does**: Combined check for both email and username existence.
- **How to implement**:
  - **Body**: `{ "email": "string", "username": "string" }`
- **Response**: `{ "email": boolean, "username": boolean }`

---

## 📱 5. Phone Authentication

### `POST /api/phone-auth/send-otp`
- **What it does**: Generates and sends a 6-digit OTP to the specified Indian phone number via SMS.
- **How to implement**:
  - **Body**: `{ "phone": "+91XXXXXXXXXX" }`
- **Response**:
  - `200 OK`: `{ "message": "OTP sent successfully" }`
  - `400/500 Errors`: `{ "error": "Error details" }`