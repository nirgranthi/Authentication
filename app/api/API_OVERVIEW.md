
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
│           ├── EXPORTS: authOptions (NextAuthOptions), handler as GET & POST
│           │
│           └── 🔮 FUTURE INSERTION POINTS
│               ├── [OAuth Providers] → Add GitHub/Google inside providers: []
│               │     e.g. import GithubProvider from "next-auth/providers/github"
│               │
│               ├── [Email Verification] → Add signIn() callback
│               │     Check user.isVerified before returning session
│               │     e.g. callbacks: { signIn: async ({ user }) => user.isVerified }
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
│       └── RETURNS: 201 { message: "User Registered" }
│                 or 500 { message: "An error occured while registering the user" }
│
│       └── 🔮 FUTURE INSERTION POINTS
│           ├── [Email Verification on Signup]
│           │     After User.create(), generate a verification token
│           │     Send email via nodemailer / Resend / SendGrid
│           │     New route needed: POST /api/verifyEmail?token=...
│           │
│           ├── [Input Validation]
│           │     Add zod/yup schema validation before creating the user
│           │
│           ├── [Welcome Email]
│           │     Trigger a transactional email after successful registration
│           │
│           └── [Role Assignment]
│                 Assign default role (e.g. "user") on User.create()
│
│
└── 📁 login/                                    ← ⚠️ Empty (placeholder folder)
    └── (no route.ts — login is handled via NextAuth at /api/auth/...)

    └── 🔮 FUTURE INSERTION POINTS
        ├── [Custom Login Audit Log]
        │     POST /api/login/log → record IP, device, timestamp on each login
        │
        └── [Forgot Password]
              POST /api/login/forgotPassword → send reset link via email
              POST /api/login/resetPassword  → validate token + update hashed password
```

---

## 🧩 Shared Dependencies (used across routes)

```
lib/
└── mongodb.ts          → connectMongoDB()
    └── mongoose.connect(process.env.MONGO_URL)
        Used by: ALL three active routes

models/
└── user.ts             → Mongoose User schema
    Fields: username (String), email (String), password (String), timestamps
    Used by: auth/[...nextauth], checkUserExists, signup

app/scripts/
├── encrypt.ts          → encrypt(data: string) → bcrypt.hash(data, 10)
│   Used by: signup/route.ts
│
└── isEmail.ts          → isEmail(data: string) → boolean (regex test)
    Used by: login/page.tsx, signup/page.tsx (client-side, not in API)
```

---

## 🔮 Broad Future Features & Where to Add Them

| Feature                    | Where to Add                                                         |
|----------------------------|----------------------------------------------------------------------|
| Email Verification         | `signup/route.ts` (send token) + new `api/verifyEmail/route.ts`      |
| Forgot / Reset Password    | New `api/login/forgotPassword/route.ts` + `resetPassword/route.ts`   |
| OAuth (Google / GitHub)    | `auth/[...nextauth]/route.ts` inside `providers: []`                 |
| JWT Role / Claims          | `auth/[...nextauth]/route.ts` `callbacks.jwt` + `callbacks.session`  |
| MFA / 2FA                  | `auth/[...nextauth]/route.ts` inside `authorize()`                   |
| Rate Limiting              | Middleware (`middleware.ts`) or wrapper around `authorize()`          |
| Audit / Login Logs         | New `api/login/log/route.ts` or inside NextAuth `events.signIn`      |
| Phone Number Auth          | `models/user.ts` (add field) + `checkUserExists/route.ts` + signup   |
| Input Validation (Zod)     | `signup/route.ts` + `checkUserExists/route.ts` before DB calls        |
| Refresh Token Rotation     | `auth/[...nextauth]/route.ts` `callbacks.jwt` block                  |
