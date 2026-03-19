'use client'

import { ChangeEvent, SubmitEvent, useState } from 'react'
import { AppleSvg, EmailSvg, GoogleSvg, PasswordSvg, MoonSvg, SunSvg, EyeSvg, EyeOffSvg } from '../styles/Svgs'
import { StyledWrapper } from '../styles/LoginCSS'
import { isEmail } from '../scripts/isEmail'
import Link from 'next/link'
import { signIn } from 'next-auth/react'

export default function Login() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const [userdata, setUserdata] = useState({
    username: '',
    email: '',
    password: ''
  })

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        email: userdata.email,
        username: userdata.username,
        password: userdata.password,
        redirect: false,
      });
      
      if (res?.error) {
        console.log("Login error:", res.error);
        setError("Invalid username/email or password");
      } else {
        console.log("Login successful:", res);
      }
    } catch (error) {
      console.log("Login exception:", error);
    }
  };

  const handleIdentifierChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError('');
    const value = e.target.value
    if (isEmail(value)) {
      setUserdata({ ...userdata, email: value, username: '' });
    } else {
      setUserdata({ ...userdata, username: value, email: '' });
    }
  }

  return (
    <StyledWrapper className={isDarkMode ? 'dark-mode' : ''}>
      <div className="wrapper">
        <form className="form" onSubmit={handleSubmit}>
          <div className="flexRow" style={{ marginBottom: '10px' }}>
            <h2>Sign In</h2>
            <button
              type="button"
              className="themeToggle"
              onClick={() => setIsDarkMode(!isDarkMode)}
            >
              {isDarkMode ? <SunSvg /> : <MoonSvg />}
            </button>
          </div>

          <div className="flexColumn">
            <label>Email </label>
          </div>
          <div className="inputForm">
            <EmailSvg />
            <input placeholder="Enter your Email/Username" className="input" type="text" required
              value={userdata.email || userdata.username} onChange={handleIdentifierChange} />
          </div>

          <div className="flexColumn">
            <label>Password </label>
          </div>
          <div className="inputForm">
            <PasswordSvg />
            <input placeholder="Enter your Password" className="input" type={showPassword ? "text" : "password"} required
              value={userdata.password} onChange={(e) => { setError(''); setUserdata({ ...userdata, password: e.target.value }); }} />
            <span style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }} onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOffSvg /> : <EyeSvg />}
            </span>
          </div>

          <div className="flexRow">
            <label className="rememberMe">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <span className="span">Forgot password?</span>
          </div>
          {error && <div className="errorMsg">{error}</div>}
          <button className="buttonSubmit">Sign In</button>
          <p className="p">{`Don't have an account?`} <Link href="/signup" className="span">Sign Up</Link></p>
          <div className="flexRow">
            <button className="btn">
              <GoogleSvg />
              Google
            </button>
            <button className="btn">
              <AppleSvg />
              Apple
            </button>
          </div>
        </form>
      </div>
    </StyledWrapper>
  );
}