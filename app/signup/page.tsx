'use client'

import { useState, ChangeEvent, SubmitEvent, useEffect, Suspense } from 'react'
// Removed useDarkMode import as it is now handled by useTheme
import { AppleSvg, EmailSvg, GoogleSvg, PasswordSvg, UsernameSvg } from '../components/SVGs'
import { StyledWrapper } from '../styles/LoginCSS'
import Link from 'next/link';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { DarkModeButton, ShowPasswordButton, SignInButton } from '../components/Buttons'
import { validateUsername, validatePassword, validateEmail } from '@/lib/validation'
import { useSession, signIn } from 'next-auth/react'
import { useAuthRedirect } from '../hooks/useAuthRedirect'
import { useOAuthError } from '../hooks/useOAuthError'
import { userdataProps } from '../components/types'
import { useTheme } from '../components/ThemeProvider'
export default function Signup() {
    return (
        <Suspense fallback={<div className="flex h-screen w-full items-center justify-center">Loading...</div>}>
            <SignupContent />
        </Suspense>
    )
}

function SignupContent() {
    const { isDarkMode, setIsDarkMode } = useTheme();
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter()

    useAuthRedirect();
    const oauthError = useOAuthError();

    useEffect(() => {
        if (oauthError) setEmailError(oauthError);
    }, [oauthError]);

    const [userdata, setUserdata] = useState<userdataProps>({
        email: '',
        username: '',
        password: ''
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserdata(prev => ({ ...prev, [name]: value }));
        if (name === 'email') setEmailError('');
        if (name === 'username') setUsernameError('');
        if (name === 'password') setPasswordError('');
    };

    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const emailValidation = validateEmail(userdata.email);
        if (!emailValidation.valid) {
            setEmailError(emailValidation.error);
            return;
        }

        const usernameValidation = validateUsername(userdata.username);
        if (!usernameValidation.valid) {
            setUsernameError(usernameValidation.error);
            return;
        }

        const passwordValidation = validatePassword(userdata.password);
        if (!passwordValidation.valid) {
            setPasswordError(passwordValidation.error);
            return;
        }

        setIsLoading(true);

        try {
            const checkResponse = await axios.post("/api/checkUserExists", JSON.stringify({ email: userdata.email, username: userdata.username }))
            if (checkResponse.data.email) {
                setEmailError("Email is already in use");
                setIsLoading(false);
                return
            }
            if (checkResponse.data.username) {
                setUsernameError("Username is already in use");
                setIsLoading(false);
                return
            }
            const res = await axios.post("/api/signup", JSON.stringify(userdata))
            console.log(res)
            if (res.status === 201) {
                const form = e.target as HTMLFormElement;
                form.reset()
                router.push("/login")
            } else { console.log("User registration failed") }
        } catch (error) {
            console.log(error)
            if (axios.isAxiosError(error)) {
                if (error.response && error.response.status === 409) {
                    const message = error.response.data.message;
                    if (message.toLowerCase().includes('email')) {
                        setEmailError(message);
                    } else if (message.toLowerCase().includes('username')) {
                        setUsernameError(message);
                    }
                } else {
                    console.error("Signup error:", error);
                }
            }
            else {
                console.error("Unexpected error:", error);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <StyledWrapper className="bg-[#f7f7f7] text-[#151717] dark:bg-[#121212] dark:text-[#e0e0e0]">
            <div className="wrapper">
                <form className="form bg-white dark:bg-[#1e1e1e] dark:shadow-[0_20px_40px_rgba(0,0,0,0.5),0_5px_15px_rgba(0,0,0,0.3),inset_0_0_0_1px_rgba(255,255,255,0.05),inset_0_2px_0_rgba(255,255,255,0.05)] hover:dark:shadow-[0_30px_50px_rgba(0,0,0,0.6),0_10px_20px_rgba(0,0,0,0.4),inset_0_0_0_1px_rgba(255,255,255,0.05),inset_0_2px_0_rgba(255,255,255,0.05)]"
                    onSubmit={handleSubmit}>
                    <div className="flexRow" style={{ marginBottom: '10px' }}>
                        <h2>Sign Up</h2>
                        <DarkModeButton isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
                    </div>

                    <div className="flexColumn">
                        <label className="text-[#151717] dark:text-[#e0e0e0]">Username </label>
                    </div>
                    <div className="inputForm border-[1.5px] border-[#ecedec] bg-[#fff] dark:bg-[#2a2a2a] dark:border-[#333] focus-within:border-[#2d79f3] dark:focus-within:border-[#4da3ff]">
                        <UsernameSvg />
                        <input name="username" value={userdata.username} onChange={handleChange}
                            placeholder="Enter your Username" className="input text-[#151717] dark:text-[#e0e0e0] placeholder-[#999] dark:placeholder-[#888]"
                            type="text" minLength={4} maxLength={20} required />
                    </div>
                    {usernameError && <div className="errorMsg">{usernameError}</div>}

                    <div className="flexColumn">
                        <label className="text-[#151717] dark:text-[#e0e0e0]">Email </label>
                    </div>
                    <div className="inputForm border-[1.5px] border-[#ecedec] bg-[#fff] dark:bg-[#2a2a2a] dark:border-[#333] focus-within:border-[#2d79f3] dark:focus-within:border-[#4da3ff]">
                        <EmailSvg />
                        <input name="email" value={userdata.email} onChange={handleChange}
                            placeholder="Enter your Email" className="input text-[#151717] dark:text-[#e0e0e0] placeholder-[#999] dark:placeholder-[#888]" type="email" required />
                    </div>
                    {emailError && <div className="errorMsg">{emailError}</div>}

                    <div className="flexColumn">
                        <label className="text-[#151717] dark:text-[#e0e0e0]">Password </label>
                    </div>
                    <div className="inputForm border-[1.5px] border-[#ecedec] bg-[#fff] dark:bg-[#2a2a2a] dark:border-[#333] focus-within:border-[#2d79f3] dark:focus-within:border-[#4da3ff]">
                        <PasswordSvg />
                        <input name="password" value={userdata.password} onChange={handleChange} minLength={8}
                            placeholder="Enter your Password" className="input text-[#151717] dark:text-[#e0e0e0] placeholder-[#999] dark:placeholder-[#888]" type={showPassword ? "text" : "password"} required />
                        <ShowPasswordButton showPassword={showPassword} setShowPassword={setShowPassword} />
                    </div>
                    {passwordError && <div className="errorMsg">{passwordError}</div>}

                    <SignInButton isLoading={isLoading} text="Sign Up" />

                    <p className="p text-[#151717] dark:text-[#e0e0e0]">
                        {`Already have an account?`}
                        <Link href="/login" className="span text-[#2d79f3] dark:text-[#4da3ff]">Sign In</Link>
                    </p>

                    <div className="flexRow">
                        <button type="button" className="btn bg-white dark:bg-[#2a2a2a] text-[#151717] dark:text-[#e0e0e0] border border-[#ededef] dark:border-[#444] hover:border-[#2d79f3] dark:hover:border-[#4da3ff]" onClick={() => signIn('google')}>
                            <GoogleSvg /> Google
                        </button>

                        <button type="button" className="btn bg-white dark:bg-[#2a2a2a] text-[#151717] dark:text-[#e0e0e0] border border-[#ededef] dark:border-[#444] hover:border-[#2d79f3] dark:hover:border-[#4da3ff]" onClick={() => signIn('apple')}>
                            <AppleSvg /> Apple
                        </button>
                    </div>
                </form>
            </div>
        </StyledWrapper>
    );
}