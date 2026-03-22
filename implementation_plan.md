# Refactoring User Checks and Unique Registration

## Goal Description
Enhance user registration by robustly checking for existing emails, usernames, and phone numbers before appending dummy data. Unused or auto-generated fields (like dummy emails for Phone auth, or missing usernames for OAuth) will be guaranteed unique across the database, preventing conflicts. We will also refactor traditional signup to utilize these check functions.

## Proposed Changes

### [Component: Core DB Checks Module]
We will isolate all user existence checks into small, reusable functions.

#### [NEW] `lib/userChecks.ts`
- `isEmailExists(email: string): Promise<boolean>`
- `isPhoneNumberExists(phone: string): Promise<boolean>`
- `isUsernameExists(username: string): Promise<boolean>`
- `generateUniqueEmail(baseEmail: string): Promise<string>`: Appends random characters if `baseEmail` exists.
- `generateUniqueUsername(baseUsername: string): Promise<string>`: Appends random characters if `baseUsername` exists.

#### [NEW] API Routes
- Provide HTTP wrappers for the frontend if necessary:
  - `app/api/check/email/route.ts`
  - `app/api/check/phone/route.ts`
  - `app/api/check/username/route.ts`

---

### [Component: Registration Flow Updates]

#### [MODIFY] `features/phone-auth/provider.ts`
- Before registering a new user via phone, we generate their dummy email (`[phone]@authentication.com`) and dummy username (`user_[phone]`).
- We will use `generateUniqueEmail` and `generateUniqueUsername` to verify and append random strings if they conflict.

#### [MODIFY] `app/api/auth/[...nextauth]/route.ts`
- When a user signs in via OAuth (Google/Apple) for the first time:
- Currently, they don't get a username. We will generate a base username from their email prefix (or `user.name`), parse it through `generateUniqueUsername`, and assign it to them.

#### [MODIFY] `app/api/signup/route.ts`
- Refactor the standard credentials signup route to use `isEmailExists` and `isUsernameExists` from `lib/userChecks.ts` instead of raw Mongoose queries, making the code cleaner and more unified.
