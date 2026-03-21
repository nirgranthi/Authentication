'use client'

import { ChangeEvent, SubmitEvent, useState, Suspense } from 'react'
import { useDarkMode } from '../hooks/useDarkMode'
import { EmailSvg } from '../components/SVGs'
import { StyledWrapper } from '../styles/LoginCSS'
import Link from 'next/link'
import { DarkModeButton, SignInButton } from '../components/Buttons'

export default function ForgotPassword() {
  return (
    <Suspense fallback={<div className="flex h-screen w-full items-center justify-center">Loading...</div>}>
      <ForgotPasswordContent />
    </Suspense>
  )
}

function ForgotPasswordContent() {
  const [isDarkMode, setIsDarkMode] = useDarkMode(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    setError('');

    try {
      const res = await fetch('/api/forgotPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message);
      } else {
        setError(data.message || 'An error occurred');
      }
    } catch (err) {
      setError('An error occurred while sending the request');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <StyledWrapper className={isDarkMode ? 'dark-mode' : ''}>
      <div className="wrapper">
        <form className="form" onSubmit={handleSubmit}>
          <div className="flexRow mb-2.5">
            <h2>Forgot Password</h2>
            <DarkModeButton isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
          </div>

          <p className="p" style={{ marginBottom: '20px' }}>
            Enter your email address and we will send you a link to reset your password.
          </p>

          <div className="flexColumn">
            <label>Email </label>
          </div>
          <div className="inputForm">
            <EmailSvg />
            <input 
              placeholder="Enter your Email" 
              className="input" 
              type="email" 
              required
              value={email} 
              onChange={(e) => { setEmail(e.target.value); setError(''); setMessage(''); }} 
            />
          </div>

          {error && <div className="errorMsg">{error}</div>}
          {message && <div style={{ color: '#10b981', fontSize: '13px', marginTop: '10px', textAlign: 'center' }}>{message}</div>}
          
          <SignInButton isLoading={isLoading} text="Send Reset Link" />
          
          <p className="p">Remember your password? <Link href="/login" className="span">Sign In</Link></p>
        </form>
      </div>
    </StyledWrapper>
  );
}
