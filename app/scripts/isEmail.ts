/* checks a string for if it is email or not, returns a boolean value */
export function isEmail (data: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data)
}