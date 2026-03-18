'use client'

import { useState } from 'react'
import { AppleSvg, EmailSvg, GoogleSvg, PasswordSvg, MoonSvg, SunSvg } from '../styles/Svgs'
import { StyledWrapper } from '../styles/LoginCSS'

export default function Signup  () {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <StyledWrapper className={isDarkMode ? 'dark-mode' : ''}>
      <div className="wrapper">
        <form className="form">
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
            <label>Email </label>
          </div>
          <div className="inputForm">
            <EmailSvg />
            <input placeholder="Enter your Email" className="input" type="text" />
          </div>
          <div className="flexColumn">
            <label>Password </label>
          </div>
          <div className="inputForm">
            <PasswordSvg />       
            <input placeholder="Enter your Password" className="input" type="password" />
          </div>
          <div className="flexRow">
            <label className="rememberMe">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <span className="span">Forgot password?</span>
          </div>
          <button className="buttonSubmit">Sign In</button>
          <p className="p">{`Already have an account?`} <a href="/login" className="span">Sign In</a></p>
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