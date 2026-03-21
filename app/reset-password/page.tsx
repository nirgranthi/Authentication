'use client'

import { ChangeEvent, SubmitEvent, useState, Suspense } from 'react'
import { useDarkMode } from '../hooks/useDarkMode'
import { PasswordSvg } from '../components/SVGs'
import { StyledWrapper } from '../styles/LoginCSS'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { DarkModeButton, SignInButton, ShowPasswordButton } from '../components/Buttons'

export default function ResetPassword() {
  return (
    <Suspense fallback={<div className="flex h-screen w-full items-center justify-center">Loading...</div>}>
      <ResetPasswordContent />
    </Suspense>
  )
}

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  
  const [isDarkMode, setIsDarkMode] = useDarkMode(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!token) {
      setError("Invalid or missing reset token.");
      return;
    }
    
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    
    setIsLoading(true);
    setMessage('');
    setError('');

    try {
      const res = await fetch('/api/resetPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token, newPassword: password })
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Password reset successful. Redirecting to login...");
        setTimeout(() => {
          router.push('/login?reset=success');
        }, 2000);
      } else {
        setError(data.message || 'An error occurred');
      }
    } catch (err) {
      setError('An error occurred while resetting your password');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <StyledWrapper className={isDarkMode ? 'dark-mode' : ''}>
      <div className="wrapper">
        <form className="form" onSubmit={handleSubmit}>
          <div className="flexRow mb-2.5">
            <h2>Reset Password</h2>
            <DarkModeButton isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
          </div>

          <div className="flexColumn">
            <label>New Password </label>
          </div>
          <div className="inputForm">
            <PasswordSvg />
            <input 
              placeholder="Enter New Password" 
              className="input" 
              type={showPassword ? "text" : "password"} 
              minLength={8} 
              required
              value={password} 
              onChange={(e) => { setPassword(e.target.value); setError(''); setMessage(''); }} 
            />
            <ShowPasswordButton showPassword={showPassword} setShowPassword={setShowPassword} />
          </div>

          <div className="flexColumn">
            <label>Confirm Password </label>
          </div>
          <div className="inputForm">
            <PasswordSvg />
            <input 
              placeholder="Confirm New Password" 
              className="input" 
              type={showPassword ? "text" : "password"} 
              minLength={8} 
              required
              value={confirmPassword} 
              onChange={(e) => { setConfirmPassword(e.target.value); setError(''); setMessage(''); }} 
            />
          </div>

          {error && <div className="errorMsg">{error}</div>}
          {message && <div style={{ color: '#10b981', fontSize: '13px', marginTop: '10px', textAlign: 'center' }}>{message}</div>}
          
          <SignInButton isLoading={isLoading} text="Reset Password" />
          
          <p className="p">Remember your password? <Link href="/login" className="span">Sign In</Link></p>
        </form>
      </div>
    </StyledWrapper>
  );
}
