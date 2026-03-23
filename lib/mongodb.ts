import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGO_URL!;

if (!MONGODB_URI) {
    throw new Error("Please define the MONGO_URL environment variable inside .env");
}

let cached = (global as any).mongoose;

if (!cached) {
    cached = (global as any).mongoose = { conn: null, promise: null };
}

export const connectMongoDB = async () => {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            console.log("Connected to database successfully!");
            return mongoose;
        }).catch((error) => {
            console.log("error connecting to database: ", error);
            throw error;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
};