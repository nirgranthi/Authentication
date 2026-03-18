'use client'

import { useState, ChangeEvent, SubmitEvent } from 'react'
import { AppleSvg, EmailSvg, GoogleSvg, PasswordSvg, MoonSvg, SunSvg, UsernameSvg } from '../styles/Svgs'
import { StyledWrapper } from '../styles/LoginCSS'

export default function Signup() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const [userdata, setUserdata] = useState({
        email: '',
        username: '',
        password: ''
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserdata(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: SubmitEvent) => {
        e.preventDefault();
        console.log(userdata);
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
                            placeholder="Enter your Password" className="input" type="password" required />
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
                        <a href="/login" className="span">Sign In</a>
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