import mongoose, { models, Schema } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: false,
        unique: true,
        sparse: true,
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    name: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false
    },
    provider: {
        type: String,
        required: false,
        default: "credentials"
    },
    providerId: {
        type: String,
        required: false
    },
    dob: {
        type: Date,
        required: false
    },
    password: {
        type: String,
        required: false
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationToken: {
        type: String
    },
    verificationTokenExpiry: {
        type: Date
    }
}, { timestamps: true }
);

const User = models.User || mongoose.model("User", userSchema)

export default User