# MongoDB Connector
Last updated: 2026-03-20

## Source File
`lib/mongodb.ts`

## Purpose
Provides a reusable async function that establishes a Mongoose connection to MongoDB. Called at the top of every API route that needs DB access.

## Exports
- `connectMongoDB` — `async () => void`

## Logic Summary
1. Calls `mongoose.connect(process.env.MONGO_URL!)` with the connection string from env
2. On success: logs `"Connected to database successfully!"`
3. On error: logs `"error connecting to database: "` + error object
4. Does **not** throw — errors are swallowed with `console.log`

**Note:** There is no connection caching / memoization. Each call to `connectMongoDB()` attempts a new `mongoose.connect()`. In practice Mongoose deduplicates open connections internally, but an explicit cache pattern (checking `mongoose.connection.readyState`) would be more robust.

## Inputs & Outputs
| Direction | Name | Type | Description |
|-----------|------|------|-------------|
| Input | — | — | None |
| Env | `MONGO_URL` | `string` | Full MongoDB connection URI (from `.env`) |
| Output | — | `void` | Resolves when connected; errors are caught internally |

## Dependencies
- `mongoose` — connection management

## Known Limitations / TODOs
- No connection state check before connecting (can produce redundant connection attempts)
- Errors are silently swallowed — a route calling this will continue even if DB connection fails
- `MONGO_URL!` non-null assertion — will crash at runtime if env var is missing
