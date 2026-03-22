import { AppleSvg, EyeOffSvg, EyeSvg, GoogleSvg, MoonSvg, SunSvg } from "./SVGs"
import { PhoneSignInButton } from "@/features/phone-auth/components/PhoneSignInButton"

export const SignInButton = ({ isLoading, text }) => {
    return (
        <button
            className="mt-5 mb-2.5 w-full h-12.5 rounded-[10px] bg-[#151717] text-white text-[15px] font-semibold cursor-pointer shadow-[0_5px_15px_rgba(0,0,0,0.2),inset_0_2px_0_rgba(255,255,255,0.1)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#2a2c2c] hover:shadow-[0_8px_20px_rgba(0,0,0,0.25),inset_0_2px_0_rgba(255,255,255,0.1)] active:translate-y-px active:shadow-[0_2px_5px_rgba(0,0,0,0.2)] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none dark:bg-[#4da3ff] dark:text-[#121212] dark:shadow-[0_5px_15px_rgba(0,0,0,0.4),inset_0_2px_0_rgba(255,255,255,0.2)] dark:hover:bg-[#3b8ce0] dark:hover:shadow-[0_8px_20px_rgba(0,0,0,0.5),inset_0_2px_0_rgba(255,255,255,0.2)]"
            disabled={isLoading}
        >
            {isLoading ? (
                <span className="inline-block w-5 h-5 border-[3px] border-white/40 border-t-white rounded-full animate-[spin_0.7s_linear_infinite]" />
            ) : (
                text
            )}
        </button>
    )
}

export const DarkModeButton = ({ isDarkMode, setIsDarkMode }) => {
    return (
        <button
            type="button"
            className="flex items-center justify-center p-2 rounded-full bg-transparent border-none cursor-pointer text-[#151717] transition-colors duration-200 hover:bg-[#eee] dark:text-[#e0e0e0] dark:hover:bg-[#333]"
            onClick={() => setIsDarkMode(!isDarkMode)}
        >
            {isDarkMode ? <SunSvg /> : <MoonSvg />}
        </button>
    )
}

export const ShowPasswordButton = ({ showPassword, setShowPassword }) => {
    return (
        <span className="cursor-pointer flex items-center" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <EyeOffSvg /> : <EyeSvg />}
        </span>
    )
}

export const SignInProviders = () => {
    const classname = "btn bg-white dark:bg-[#2a2a2a] text-[#151717] dark:text-[#e0e0e0] border border-[#ededef] dark:border-[#444] hover:border-[#2d79f3] dark:hover:border-[#4da3ff]"
    return (
        <div className="flexColumn w-full">
            <div className="flexRow w-full">
                <button
                    type="button"
                    className={classname}
                    onClick={() => signIn('google')}>
                    <GoogleSvg />
                    Google
                </button>
                <button
                    type="button"
                    className={classname}
                    onClick={() => signIn('apple')}>
                    <AppleSvg />
                    Apple
                </button>
            </div>
            <PhoneSignInButton />
        </div>
    )
}