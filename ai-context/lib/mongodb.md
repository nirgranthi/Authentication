# MongoDB Connector
Last updated: 2026-03-21

## Source File
`lib/mongodb.ts`

## Purpose
Establishes a connection to the MongoDB database using Mongoose.

## Exports
- `connectMongoDB` — Async connection function.

## Logic Summary
1. Uses `process.env.MONGO_URL!` (non-null assertion).
2. Attempts `mongoose.connect()`.
3. Logs success or failure to the console.

## Dependencies
- `mongoose`.

## Known Limitations / TODOs
- No connection pooling/caching logic explicitly handled in this wrapper (rely on Mongoose internals).
