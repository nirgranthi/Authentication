'use client'

import { SubmitEvent, useState, Suspense } from 'react'
import { useTheme } from '../components/ThemeProvider'
import { EmailSvg, PasswordSvg, UsernameSvg } from '../components/SVGs'
import { StyledWrapper } from '../styles/LoginCSS'
import Link from 'next/link'
import { DarkModeButton, SignInButton, ShowPasswordButton } from '../components/Buttons'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export default function ForgotPassword() {
  return (
    <Suspense fallback={<div className="flex h-screen w-full items-center justify-center">Loading...</div>}>
      <ForgotPasswordContent />
    </Suspense>
  )
}

function ForgotPasswordContent() {
  const { isDarkMode, setIsDarkMode } = useTheme();
  const [method, setMethod] = useState<'email' | 'phone'>('email');

  // Email state
  const [email, setEmail] = useState('');

  // Phone state
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [token, setToken] = useState('');
  const [step, setStep] = useState(1); // 1: Phone, 2: OTP, 3: New Password
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleEmailSubmit = async (e: SubmitEvent<HTMLFormElement> | React.SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    setError('');

    try {
      const res = await axios.post('/api/forgotPassword', { email });
      setMessage(res.data.message);
    } catch (err: any) {
      setError(err.response?.data?.message || err.response?.data?.error || 'An error occurred while sending the request');
    } finally {
      setIsLoading(false);
    }
  }

  const handlePhoneStep1 = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    setError('');

    try {
      // First check if phone exists
      const checkRes = await axios.post('/api/check/phone', { phone });
      if (!checkRes.data.exists) {
        setError('No account found with this phone number.');
        setIsLoading(false);
        return;
      }

      // Format phone logic from hooks
      const formattedPhone = phone.startsWith('+91') ? phone : `+91${phone}`;
      await axios.post('/api/phone-auth/send-otp', { phone: formattedPhone });
      setPhone(formattedPhone); // Keep formatted text to reuse it when we need to verify the OTP.
      setStep(2);
      setMessage('OTP sent successfully.');
    } catch (err: any) {
      setError(err.response?.data?.error || err.response?.data?.message || 'Failed to send OTP.');
    } finally {
      setIsLoading(false);
    }
  }

  const handlePhoneStep2 = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    setError('');

    try {
      const res = await axios.post('/api/forgotPassword/phone/verify-otp', { phone, otp });
      setToken(res.data.token);
      setStep(3);
      setMessage('OTP verified. Please enter your new password.');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid or expired OTP.');
    } finally {
      setIsLoading(false);
    }
  }

  const handlePhoneStep3 = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);
    setMessage('');
    setError('');

    try {
      const res = await axios.post('/api/resetPassword', { token, newPassword });
      setMessage(res.data.message);
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || err.response?.data?.error || 'Failed to reset password.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <StyledWrapper className="bg-[#f7f7f7] text-[#151717] dark:bg-[#121212] dark:text-[#e0e0e0]">
      <div className="wrapper">
        <form className="form bg-white dark:bg-[#1e1e1e] dark:shadow-[0_20px_40px_rgba(0,0,0,0.5),0_5px_15px_rgba(0,0,0,0.3),inset_0_0_0_1px_rgba(255,255,255,0.05),inset_0_2px_0_rgba(255,255,255,0.05)] hover:dark:shadow-[0_30px_50px_rgba(0,0,0,0.6),0_10px_20px_rgba(0,0,0,0.4),inset_0_0_0_1px_rgba(255,255,255,0.05),inset_0_2px_0_rgba(255,255,255,0.05)]"
          onSubmit={method === 'email' ? handleEmailSubmit : (step === 1 ? handlePhoneStep1 : (step === 2 ? handlePhoneStep2 : handlePhoneStep3))}>
          <div className="flexRow mb-2.5">
            <h2>Forgot Password</h2>
            <DarkModeButton isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
          </div>

          <div className="flex mb-4 border-b border-[#ecedec] dark:border-[#333]">
            <button
              type="button"
              className={`flex-1 py-2 text-center text-sm font-semibold transition-colors duration-200 ${method === 'email' ? 'text-[#2d79f3] dark:text-[#4da3ff] border-b-2 border-[#2d79f3] dark:border-[#4da3ff]' : 'text-[#666] dark:text-[#aaa] hover:text-[#151717] dark:hover:text-[#e0e0e0]'}`}
              onClick={() => { setMethod('email'); setError(''); setMessage(''); setStep(1); }}
            >
              Email
            </button>
            <button
              type="button"
              className={`flex-1 py-2 text-center text-sm font-semibold transition-colors duration-200 ${method === 'phone' ? 'text-[#2d79f3] dark:text-[#4da3ff] border-b-2 border-[#2d79f3] dark:border-[#4da3ff]' : 'text-[#666] dark:text-[#aaa] hover:text-[#151717] dark:hover:text-[#e0e0e0]'}`}
              onClick={() => { setMethod('phone'); setError(''); setMessage(''); setStep(1); }}
            >
              Phone Number
            </button>
          </div>

          <p className="p text-[#151717] dark:text-[#e0e0e0]" style={{ marginBottom: '20px' }}>
            {method === 'email'
              ? "Enter your email address and we will send you a link to reset your password."
              : (step === 1 ? "Enter your phone number to receive an OTP."
                : (step === 2 ? "Enter the OTP sent to your phone."
                  : "Enter your new password."))}
          </p>

          {method === 'email' && (
            <>
              <div className="flexColumn">
                <label className="text-[#151717] dark:text-[#e0e0e0]">Email </label>
              </div>
              <div className="inputForm border-[1.5px] border-[#ecedec] bg-white dark:bg-[#2a2a2a] dark:border-[#333] focus-within:border-[#2d79f3] dark:focus-within:border-[#4da3ff]">
                <EmailSvg />
                <input
                  placeholder="Enter your Email"
                  className="input text-[#151717] dark:text-[#e0e0e0] placeholder-[#999] dark:placeholder-[#888]"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(''); setMessage(''); }}
                />
              </div>
            </>
          )}

          {method === 'phone' && step === 1 && (
            <>
              <div className="flexColumn">
                <label className="text-[#151717] dark:text-[#e0e0e0]">Phone Number </label>
              </div>
              <div className="inputForm border-[1.5px] border-[#ecedec] bg-white dark:bg-[#2a2a2a] dark:border-[#333] focus-within:border-[#2d79f3] dark:focus-within:border-[#4da3ff]">
                <UsernameSvg />
                <input
                  placeholder="Enter your Phone Number"
                  className="input text-[#151717] dark:text-[#e0e0e0] placeholder-[#999] dark:placeholder-[#888]"
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => { setPhone(e.target.value); setError(''); setMessage(''); }}
                />
              </div>
            </>
          )}

          {method === 'phone' && step === 2 && (
            <>
              <div className="flexColumn">
                <label className="text-[#151717] dark:text-[#e0e0e0]">OTP </label>
              </div>
              <div className="inputForm border-[1.5px] border-[#ecedec] bg-white dark:bg-[#2a2a2a] dark:border-[#333] focus-within:border-[#2d79f3] dark:focus-within:border-[#4da3ff]">
                <UsernameSvg />
                <input
                  placeholder="Enter 6-digit OTP"
                  className="input text-[#151717] dark:text-[#e0e0e0] placeholder-[#999] dark:placeholder-[#888]"
                  type="text"
                  required
                  maxLength={6}
                  value={otp}
                  onChange={(e) => { setOtp(e.target.value); setError(''); setMessage(''); }}
                />
              </div>
            </>
          )}

          {method === 'phone' && step === 3 && (
            <>
              <div className="flexColumn">
                <label className="text-[#151717] dark:text-[#e0e0e0]">New Password </label>
              </div>
              <div className="inputForm border-[1.5px] border-[#ecedec] bg-white dark:bg-[#2a2a2a] dark:border-[#333] focus-within:border-[#2d79f3] dark:focus-within:border-[#4da3ff]">
                <PasswordSvg />
                <input
                  placeholder="Enter new password"
                  className="input text-[#151717] dark:text-[#e0e0e0] placeholder-[#999] dark:placeholder-[#888]"
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={8}
                  value={newPassword}
                  onChange={(e) => { setNewPassword(e.target.value); setError(''); setMessage(''); }}
                />
                <ShowPasswordButton showPassword={showPassword} setShowPassword={setShowPassword} />
              </div>

              <div className="flexColumn" style={{ marginTop: '15px' }}>
                <label className="text-[#151717] dark:text-[#e0e0e0]">Confirm Password </label>
              </div>
              <div className="inputForm border-[1.5px] border-[#ecedec] bg-white dark:bg-[#2a2a2a] dark:border-[#333] focus-within:border-[#2d79f3] dark:focus-within:border-[#4da3ff]">
                <PasswordSvg />
                <input
                  placeholder="Confirm new password"
                  className="input text-[#151717] dark:text-[#e0e0e0] placeholder-[#999] dark:placeholder-[#888]"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  minLength={8}
                  value={confirmPassword}
                  onChange={(e) => { setConfirmPassword(e.target.value); setError(''); setMessage(''); }}
                />
                <ShowPasswordButton showPassword={showConfirmPassword} setShowPassword={setShowConfirmPassword} />
              </div>
            </>
          )}

          {error && <div className="errorMsg" style={{ color: '#ef4444', fontSize: '13px', marginTop: '10px', textAlign: 'center' }}>{error}</div>}
          {message && <div style={{ color: '#10b981', fontSize: '13px', marginTop: '10px', textAlign: 'center' }}>{message}</div>}

          <div style={{ marginTop: '20px' }}>
            <SignInButton
              isLoading={isLoading}
              text={method === 'email' ? "Send Reset Link" : (step === 1 ? "Send OTP" : (step === 2 ? "Verify OTP" : "Reset Password"))}
            />
          </div>

          <p className="p text-[#151717] dark:text-[#e0e0e0]">
            Remember your password? <Link href="/login" className="span text-[#2d79f3] dark:text-[#4da3ff]">Sign In</Link>
          </p>
        </form>
      </div>
    </StyledWrapper>
  );
}
