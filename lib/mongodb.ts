import mongoose from "mongoose";

export const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL!);
        console.log("Connected to database successfully!");
    } catch (error) {
        console.log("error connecting to database: ", error);
    };
};