'use client'

import { useState, ChangeEvent, SubmitEvent, useEffect } from 'react'
import { useDarkMode } from '../hooks/useDarkMode'
import { AppleSvg, EmailSvg, GoogleSvg, PasswordSvg, UsernameSvg } from '../components/SVGs'
import { StyledWrapper } from '../styles/LoginCSS'
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { DarkModeButton, ShowPasswordButton, SignInButton } from '../components/Buttons'
import { validateUsername, validatePassword, validateEmail } from '@/lib/validation'
import { useSession, signIn } from 'next-auth/react'

export default function Signup() {
    const [isDarkMode, setIsDarkMode] = useDarkMode(false);
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter()
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === 'authenticated') {
            const username = (session?.user as Record<string, unknown>)?.username as string;
            if (username) {
                router.push(`/profile/${username}`);
            } else {
                router.push('/');
            }
        }
    }, [status, session, router]);

    const [userdata, setUserdata] = useState({
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
        <StyledWrapper className={isDarkMode ? 'dark-mode' : ''}>
            <div className="wrapper">
                <form className="form" onSubmit={handleSubmit}>
                    <div className="flexRow" style={{ marginBottom: '10px' }}>
                        <h2>Sign Up</h2>
                        <DarkModeButton isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
                    </div>

                    <div className="flexColumn">
                        <label>Username </label>
                    </div>
                    <div className="inputForm">
                        <UsernameSvg />
                        <input name="username" value={userdata.username} onChange={handleChange}
                            placeholder="Enter your Username" className="input" type="text" minLength={4} maxLength={20} required />
                    </div>
                    {usernameError && <div className="errorMsg">{usernameError}</div>}

                    <div className="flexColumn">
                        <label>Email </label>
                    </div>
                    <div className="inputForm">
                        <EmailSvg />
                        <input name="email" value={userdata.email} onChange={handleChange}
                            placeholder="Enter your Email" className="input" type="email" required />
                    </div>
                    {emailError && <div className="errorMsg">{emailError}</div>}

                    <div className="flexColumn">
                        <label>Password </label>
                    </div>
                    <div className="inputForm">
                        <PasswordSvg />
                        <input name="password" value={userdata.password} onChange={handleChange} minLength={8}
                            placeholder="Enter your Password" className="input" type={showPassword ? "text" : "password"} required />
                        <ShowPasswordButton showPassword={showPassword} setShowPassword={setShowPassword} />
                    </div>
                    {passwordError && <div className="errorMsg">{passwordError}</div>}

                    <SignInButton isLoading={isLoading} text="Sign Up" />

                    <p className="p">
                        {`Already have an account?`}
                        <Link href="/login" className="span">Sign In</Link>
                    </p>

                    <div className="flexRow">
                        <button type="button" className="btn" onClick={() => signIn('google')}>
                            <GoogleSvg /> Google
                        </button>

                        <button type="button" className="btn" onClick={() => signIn('apple')}>
                            <AppleSvg /> Apple
                        </button>
                    </div>
                </form>
            </div>
        </StyledWrapper>
    );
}