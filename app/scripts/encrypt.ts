//encrypt any string with bcrypt

import bcrypt from "bcryptjs";

export async function encrypt(data: string) {
    return await bcrypt.hash(data, 10)
}