export interface ValidationResult {
    valid: boolean;
    error: string;
}

/**
 * Validates that a string is a properly formatted email address.
 */
export function validateEmail(email: string): ValidationResult {
    if (!email || email.trim().length === 0) {
        return { valid: false, error: "Email is required." };
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return { valid: false, error: "Please enter a valid email address." };
    }
    return { valid: true, error: "" };
}

/**
 * Validates that a username contains only English letters (a-z, A-Z)
 * and is between 4 and 20 characters long.
 */
export function validateUsername(username: string): ValidationResult {
    if (!username || username.trim().length === 0) {
        return { valid: false, error: "Username is required." };
    }
    if (username.length < 4 || username.length > 20) {
        return { valid: false, error: "Username must be between 4 and 20 characters." };
    }
    if (!/^[a-zA-Z]+$/.test(username)) {
        return { valid: false, error: "Username may only contain English letters (a–z, A–Z)." };
    }
    return { valid: true, error: "" };
}

/**
 * Validates that a password meets the following requirements:
 * - At least 8 characters long
 * - Contains at least one uppercase letter
 * - Contains at least one lowercase letter
 * - Contains at least one digit
 * - Contains at least one special character
 */
export function validatePassword(password: string): ValidationResult {
    if (!password || password.length === 0) {
        return { valid: false, error: "Password is required." };
    }
    if (password.length < 8) {
        return { valid: false, error: "Password must be at least 8 characters long." };
    }
    if (!/[A-Z]/.test(password)) {
        return { valid: false, error: "Password must contain at least one uppercase letter." };
    }
    if (!/[a-z]/.test(password)) {
        return { valid: false, error: "Password must contain at least one lowercase letter." };
    }
    if (!/[0-9]/.test(password)) {
        return { valid: false, error: "Password must contain at least one digit." };
    }
    if (!/[^a-zA-Z0-9]/.test(password)) {
        return { valid: false, error: "Password must contain at least one special character." };
    }
    return { valid: true, error: "" };
}
