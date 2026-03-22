import User from "@/models/user";
import { connectMongoDB } from "@/lib/mongodb";

export async function isEmailExists(email: string): Promise<boolean> {
    if (!email) return false;
    await connectMongoDB();
    const user = await User.findOne({ email: email.toLowerCase() }).select("_id");
    return !!user;
}

export async function isPhoneNumberExists(phone: string): Promise<boolean> {
    if (!phone) return false;
    await connectMongoDB();
    const user = await User.findOne({ phoneNumber: phone }).select("_id");
    return !!user;
}

export async function isUsernameExists(username: string): Promise<boolean> {
    if (!username) return false;
    await connectMongoDB();
    const user = await User.findOne({ username: username.toLowerCase() }).select("_id");
    return !!user;
}

export async function generateUniqueEmail(baseEmail: string): Promise<string> {
    let email = baseEmail.toLowerCase();
    const parts = email.split('@');
    const originalLocalPart = parts[0];
    const domain = parts[1] || 'authentication.com';
    
    while (await isEmailExists(email)) {
        const randomString = Math.random().toString(36).substring(2, 6);
        email = `${originalLocalPart}_${randomString}@${domain}`;
    }
    return email;
}

export async function generateUniqueUsername(baseUsername: string): Promise<string> {
    let username = baseUsername.toLowerCase();
    const originalBase = username;
    
    while (await isUsernameExists(username)) {
        const randomString = Math.random().toString(36).substring(2, 6);
        username = `${originalBase}_${randomString}`;
    }
    return username;
}
