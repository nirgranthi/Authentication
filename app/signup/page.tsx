'use client'

import { useState, ChangeEvent, SubmitEvent } from 'react'
import { AppleSvg, EmailSvg, GoogleSvg, PasswordSvg, MoonSvg, SunSvg, UsernameSvg, EyeSvg, EyeOffSvg } from '../styles/Svgs'
import { StyledWrapper } from '../styles/LoginCSS'
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Signup() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter()

    const [userdata, setUserdata] = useState({
        email: '',
        username: '',
        password: ''
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserdata(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(userdata);

        try {
            const checkResponse = await axios.post("/api/checkUserExists", JSON.stringify({email: userdata.email, username: userdata.username}))
            if (checkResponse.data.email) {
                console.log("email already exists: ")
                return
            }
            if (checkResponse.data.username) {
                console.log("Username already exists: ")
                return
            }
            const res = await axios.post("/api/signup", JSON.stringify(userdata))
            console.log(res)
            if (res.status === 201) {
                const form = e.target;
                form.reset()
                router.push("/login")
            } else { console.log("User registration failed")}
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <StyledWrapper className={isDarkMode ? 'dark-mode' : ''}>
            <div className="wrapper">
                <form className="form" onSubmit={handleSubmit}>
                    <div className="flexRow" style={{ marginBottom: '10px' }}>
                        <h2>Sign Up</h2>
                        <button
                            type="button"
                            className="themeToggle"
                            onClick={() => setIsDarkMode(!isDarkMode)}
                        >
                            {isDarkMode ? <SunSvg /> : <MoonSvg />}
                        </button>
                    </div>

                    <div className="flexColumn">
                        <label>Username </label>
                    </div>
                    <div className="inputForm">
                        <UsernameSvg />
                        <input name="username" value={userdata.username} onChange={handleChange}
                            placeholder="Enter your Username" className="input" type="text" required />
                    </div>

                    <div className="flexColumn">
                        <label>Email </label>
                    </div>
                    <div className="inputForm">
                        <EmailSvg />
                        <input name="email" value={userdata.email} onChange={handleChange}
                            placeholder="Enter your Email" className="input" type="email" required />
                    </div>

                    <div className="flexColumn">
                        <label>Password </label>
                    </div>
                    <div className="inputForm">
                        <PasswordSvg />
                        <input name="password" value={userdata.password} onChange={handleChange}
                            placeholder="Enter your Password" className="input" type={showPassword ? "text" : "password"} required />
                        <span style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }} onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <EyeOffSvg /> : <EyeSvg />}
                        </span>
                    </div>

                    <div className="flexRow">
                        <label className="rememberMe">
                            <input type="checkbox" />
                            <span>Remember me</span>
                        </label>
                    </div>

                    <button className="buttonSubmit">Sign Up</button>

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