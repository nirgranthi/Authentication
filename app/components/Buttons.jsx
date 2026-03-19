import { MoonSvg, SunSvg } from "./Svgs"

export const SignInButton = ({ isLoading, text }) => {
    return (
        <button className="buttonSubmit" disabled={isLoading}>
            {isLoading ? (
                <span className="spinner" />
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
            className="themeToggle"
            onClick={() => setIsDarkMode(!isDarkMode)}
        >
            {isDarkMode ? <SunSvg /> : <MoonSvg />}
        </button>
    )
}