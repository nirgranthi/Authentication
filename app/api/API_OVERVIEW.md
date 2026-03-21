
> [!IMPORTANT]
> **For AI Agents — Maintenance Rules**
> Before reading any source file, check [`ai-context/INDEX.md`](../../ai-context/INDEX.md) for an existing snapshot.
> After any logic change, update the matching `ai-context/` doc **and** this file.
> Full rules: [`.agent/workflows/update_context.md`](../../.agent/workflows/update_context.md)

---

# 🗂️ API Folder Overview
> Auto-generated summary of all routes, their logic, dependencies, and future feature insertion points.

---

```
app/api/
│
├── 📁 auth/
│   └── 📁 [...nextauth]/
│       └── 📄 route.ts                          ← NextAuth handler (GET + POST)
│           │
│           ├── PROVIDER: CredentialsProvider
│           │   ├── Accepts: email | username + password
│           │   ├── Connects to MongoDB via connectMongoDB()
│           │   ├── Looks up user by email OR username (User.findOne)
│           │   └── Validates password with bcrypt.compare()
│           │
│           ├── CALLBACK: signIn ✅ (Email Verification Guard)
│           │   └── Returns false if user.isVerified === false (blocks login)
│           │       Legacy users (isVerified === undefined) are allowed through
│           │
│           ├── EXPORTS: authOptions (NextAuthOptions), handler as GET & POST
│           │
│           └── 🔮 FUTURE INSERTION POINTS
│               ├── [OAuth Providers] → Add GitHub/Google inside providers: []
│               │     e.g. import GithubProvider from "next-auth/providers/github"
│               │
│               ├── [JWT / Session Customization] → Add jwt() + session() callbacks
│               │     Attach role, id, or extra fields to the token/session
│               │
│               ├── [Rate Limiting / Brute-Force Protection]
│               │     Wrap authorize() with attempt tracking logic
│               │
│               └── [MFA / Two-Factor Auth]
│                     Validate a TOTP code inside authorize() after password check
│
│
├── 📁 checkUserExists/
│   └── 📄 route.ts                              ← POST /api/checkUserExists
│       │
│       ├── INPUT (JSON body): { email, username }
│       ├── Connects to MongoDB via connectMongoDB()
│       ├── Queries User by email  → returns { _id } or null
│       ├── Queries User by username → returns { _id } or null
│       └── RETURNS: { email: <doc|null>, username: <doc|null> }
│           Used by: signup/page.tsx (pre-submit duplicate check)
│
│       └── 🔮 FUTURE INSERTION POINTS
│           ├── [Phone Number Check] → Add phone field lookup
│           │     const userPhone = await User.findOne({ phone }).select("_id")
│           │
│           └── [Debounce / Server-side rate limit]
│                 Add request throttling to prevent enumeration attacks
│
│
├── 📁 signup/
│   └── 📄 route.ts                              ← POST /api/signup
│       │
│       ├── INPUT (JSON body): { email, username, password }
│       ├── Hashes password via encrypt() → bcrypt.hash(password, 10)
│       ├── Connects to MongoDB via connectMongoDB()
│       ├── Creates new User document via User.create()
│       ├── Generates crypto.randomUUID() verification token (expires in 10 min)
│       ├── Saves token + expiry to user document
│       ├── Sends verification email via sendVerificationEmail()
│       └── RETURNS: 201 { message: "User Registered. Please check your email..." }
│                 or 500 { message: "An error occured while registering the user" }
│
│       └── 🔮 FUTURE INSERTION POINTS
│           ├── [Input Validation]
│           │     Add zod/yup schema validation before creating the user
│           │
│           ├── [Welcome Email]
│           │     Trigger a transactional email after verification completes
│           │
│           └── [Role Assignment]
│                 Assign default role (e.g. "user") on User.create()
│
│
├── 📁 verifyEmail/
│   └── 📄 route.ts                              ← GET /api/verifyEmail?token=...
│       │
│       ├── INPUT (query param): token
│       ├── Connects to MongoDB via connectMongoDB()
│       ├── Looks up user by verificationToken where verificationTokenExpiry > now
│       ├── Sets isVerified: true, clears verificationToken + verificationTokenExpiry
│       ├── Saves updated user document
│       └── REDIRECTS to /login?verified=true on success
│           or RETURNS 400 { message: "Invalid or expired verification token." }
│
│
├── 📁 verification-email/
│   └── 📁 resend/
│       └── 📄 route.ts                          ← POST /api/verification-email/resend
│           │
│           ├── INPUT (JSON body): { email | username }
│           ├── Connects to MongoDB via connectMongoDB()
│           ├── Checks if user is already verified
│           ├── Triggers verification flow via triggerVerificationEmail()
│           └── RETURNS: 200 { message: "Verification email sent successfully" }
│
│
├── 📁 forgotPassword/
│   └── 📄 route.ts                              ← POST /api/forgotPassword
│       │
│       ├── INPUT (JSON body): { email }
│       ├── Generates randomUUID reset token (expires in 10 min)
│       ├── Saves token + expiry to user document
│       ├── Sends reset email via sendForgotPasswordEmail()
│       └── RETURNS: 200 { message: "If an account with that email exists..." }
│
│
├── 📁 resetPassword/
│   └── 📄 route.ts                              ← POST /api/resetPassword
│       │
│       ├── INPUT (JSON body): { token, newPassword }
│       ├── Validates password strength locally
│       ├── Resolves user by token (must be > now)
│       ├── Hashes new password via encrypt()
│       ├── Sets isVerified: true (link proof)
│       ├── Clears reset token fields
│       └── RETURNS: 200 { message: "Your password has been successfully reset." }
│
│
└── 📁 login/                                    
    └── (no route.ts — login is handled via NextAuth at /api/auth/...)
```

---

## 🧩 Shared Dependencies (used across routes)

```
lib/
├── mongodb.ts              → connectMongoDB()
│   └── mongoose.connect(process.env.MONGO_URL)
│       Used by: ALL active routes
│
├── validation.ts           → validateEmail(), validateUsername(), validatePassword()
├── sendForgotPasswordEmail.ts → Email utility for password resets
│
features/verification-email/
├── triggerVerificationEmail.ts → Main entry for verification flow
└── sendVerificationEmail.ts    → Email transport for verification

models/
└── user.ts             → Mongoose User schema (isVerified, tokens, etc.)
    Fields: username, email, password,
            isVerified (Boolean, default: false) ✅,
            verificationToken (String) ✅,
            verificationTokenExpiry (Date) ✅,
            timestamps
    Used by: auth/[...nextauth], checkUserExists, signup, verifyEmail

app/scripts/
├── encrypt.ts          → encrypt(data: string) → bcrypt.hash(data, 10)
│   Used by: signup/route.ts
│
└── isEmail.ts          → isEmail(data: string) → boolean (regex test)
    Used by: login/page.tsx, signup/page.tsx (client-side, not in API)
```

---

## 🔮 Broad Future Features & Where to Add Them

| Refresh Token Rotation     | `auth/[...nextauth]/route.ts` `callbacks.jwt` block                 |
