'use client'

import { useState, ChangeEvent, SubmitEvent } from 'react'
import { useDarkMode } from '../hooks/useDarkMode'
import { AppleSvg, EmailSvg, GoogleSvg, PasswordSvg, UsernameSvg } from '../components/Svgs'
import { StyledWrapper } from '../styles/LoginCSS'
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { DarkModeButton, ShowPasswordButton, SignInButton } from '../components/Buttons'

export default function Signup() {
    const [isDarkMode, setIsDarkMode] = useDarkMode(false);
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter()

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
    };

    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(userdata);
        setIsLoading(true);

        try {
            const checkResponse = await axios.post("/api/checkUserExists", JSON.stringify({ email: userdata.email, username: userdata.username }))
            if (checkResponse.data.email) {
                setEmailError("Email is already in use");
                return
            }
            if (checkResponse.data.username) {
                setUsernameError("Username is already in use");
                return
            }
            const res = await axios.post("/api/signup", JSON.stringify(userdata))
            console.log(res)
            if (res.status === 201) {
                const form = e.target;
                form.reset()
                router.push("/login")
            } else { console.log("User registration failed") }
        } catch (error) {
            console.log(error)
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
                            placeholder="Enter your Username" className="input" type="text" required />
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
                        <input name="password" value={userdata.password} onChange={handleChange}
                            placeholder="Enter your Password" className="input" type={showPassword ? "text" : "password"} required />
                        <ShowPasswordButton showPassword={showPassword} setShowPassword={setShowPassword} />
                    </div>

                    <div className="flexRow">
                        <label className="rememberMe">
                            <input type="checkbox" defaultChecked />
                            <span>Remember me</span>
                        </label>
                    </div>

                    <SignInButton isLoading={isLoading} text="Sign Up" />

                    <p className="p">
                        {`Already have an account?`}
                        <Link href="/login" className="span">Sign In</Link>
                    </p>

                    <div className="flexRow">
                        <button type="button" className="btn">
                            <GoogleSvg /> Google
                        </button>

                        <button type="button" className="btn">
                            <AppleSvg /> Apple
                        </button>
                    </div>
                </form>
            </div>
        </StyledWrapper>
    );
}