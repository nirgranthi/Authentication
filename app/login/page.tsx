'use client'

import { ChangeEvent, SubmitEvent, useState } from 'react'
import { AppleSvg, EmailSvg, GoogleSvg, PasswordSvg, MoonSvg, SunSvg } from '../styles/Svgs'
import { StyledWrapper } from '../styles/LoginCSS'
import { isEmail } from '../scripts/isEmail'

export default function Login() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const [userdata, setUserdata] = useState({
    username: '',
    email: '',
    password: ''
  })

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(userdata);
  }

  const handleIdentifierChange = (e: ChangeEvent<HTMLInputElement>) => {
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
            <input placeholder="Enter your Password" className="input" type="password" required
              value={userdata.password} onChange={(e) => setUserdata({ ...userdata, password: e.target.value })} />
          </div>

          <div className="flexRow">
            <label className="rememberMe">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <span className="span">Forgot password?</span>
          </div>
          <button className="buttonSubmit">Sign In</button>
          <p className="p">{`Don't have an account?`} <a href="/signup" className="span">Sign Up</a></p>
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