'use client'

import { ChangeEvent, SubmitEvent, useState, useEffect, Suspense } from 'react'
import { useTheme } from '../components/ThemeProvider'
import { AppleSvg, EmailSvg, GoogleSvg, PasswordSvg } from '../components/SVGs'
import { StyledWrapper } from '../styles/LoginCSS'
import { validateEmail } from '@/lib/validation'
import Link from 'next/link'
import { signIn, getSession, useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { DarkModeButton, ShowPasswordButton, SignInButton } from '../components/Buttons'
import { userdataProps } from '../components/types'
import { useRememberMe } from '../hooks/useRememberMe'
import { useAuthRedirect } from '../hooks/useAuthRedirect'
import { useOAuthError } from '../hooks/useOAuthError'
import { ResendVerificationButton } from '@/features/verification-email/ResendVerificationButton'
export default function Login() {
  return (
    <Suspense fallback={<div className="flex h-screen w-full items-center justify-center">Loading...</div>}>
      <LoginContent />
    </Suspense>
  )
}

function LoginContent() {
  const router = useRouter();
  const { isDarkMode, setIsDarkMode } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  useAuthRedirect();
  const oauthError = useOAuthError();

  useEffect(() => {
    if (oauthError) setError(oauthError);
  }, [oauthError]);

  const [userdata, setUserdata] = useState<userdataProps>({
    username: '',
    email: '',
    password: ''
  })
  const [rememberMe, setRememberMe] = useRememberMe(true, setUserdata);

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const identifier = userdata.email || userdata.username;
      if (rememberMe) {
        localStorage.setItem('rememberedUser', identifier);
      } else {
        localStorage.removeItem('rememberedUser');
      }

      const res = await signIn("credentials", {
        email: userdata.email,
        username: userdata.username,
        password: userdata.password,
        redirect: false,
      });

      if (res?.error) {
        console.log("Login error:", res.error);
        if (res.error === 'AccessDenied') {
          setError("Please verify your email before logging in.");
        } else {
          setError("Invalid username/email or password");
        }
      } else {
        // Fetch updated session to get username for redirect
        const session = await getSession();
        const username = (session?.user as Record<string, unknown>)?.username as string;
        if (username) {
          router.push(`/profile/${username}`);
        } else {
          router.push('/');
        }
      }
    } catch (error) {
      console.log("Login exception:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleIdentifierChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError('');
    const value = e.target.value
    if (validateEmail(value).valid) {
      setUserdata({ ...userdata, email: value, username: '' });
    } else {
      setUserdata({ ...userdata, username: value, email: '' });
    }
  }

  return (
    <StyledWrapper className="bg-[#f7f7f7] text-[#151717] dark:bg-[#121212] dark:text-[#e0e0e0]">
      <div className="wrapper">
        <form className="form bg-white dark:bg-[#1e1e1e] dark:shadow-[0_20px_40px_rgba(0,0,0,0.5),0_5px_15px_rgba(0,0,0,0.3),inset_0_0_0_1px_rgba(255,255,255,0.05),inset_0_2px_0_rgba(255,255,255,0.05)] hover:dark:shadow-[0_30px_50px_rgba(0,0,0,0.6),0_10px_20px_rgba(0,0,0,0.4),inset_0_0_0_1px_rgba(255,255,255,0.05),inset_0_2px_0_rgba(255,255,255,0.05)]" onSubmit={handleSubmit}>
          <div className="flexRow mb-2.5">
            <h2>Sign In</h2>
            <DarkModeButton isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
          </div>

          <div className="flexColumn">
            <label className="text-[#151717] dark:text-[#e0e0e0]">Email </label>
          </div>
          <div className="inputForm border-[1.5px] border-[#ecedec] bg-[#fff] dark:bg-[#2a2a2a] dark:border-[#333] focus-within:border-[#2d79f3] dark:focus-within:border-[#4da3ff]">
            <EmailSvg />
            <input placeholder="Enter your Email/Username" className="input text-[#151717] dark:text-[#e0e0e0] placeholder-[#999] dark:placeholder-[#888]" type="text" minLength={4} required
              value={userdata.email || userdata.username} onChange={handleIdentifierChange} />
          </div>

          <div className="flexColumn">
            <label className="text-[#151717] dark:text-[#e0e0e0]">Password </label>
          </div>
          <div className="inputForm border-[1.5px] border-[#ecedec] bg-[#fff] dark:bg-[#2a2a2a] dark:border-[#333] focus-within:border-[#2d79f3] dark:focus-within:border-[#4da3ff]">
            <PasswordSvg />
            <input placeholder="Enter your Password" className="input text-[#151717] dark:text-[#e0e0e0] placeholder-[#999] dark:placeholder-[#888]" type={showPassword ? "text" : "password"} minLength={8} required
              value={userdata.password} onChange={(e) => { setError(''); setUserdata({ ...userdata, password: e.target.value }); }} />
            <ShowPasswordButton showPassword={showPassword} setShowPassword={setShowPassword} />
          </div>

          <div className="flexRow">
            <label className="rememberMe">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span className="text-[#151717] dark:text-[#e0e0e0]">Remember me</span>
            </label>
            <Link href="/forgot-password" className="span text-[#2d79f3] dark:text-[#4da3ff]">Forgot password?</Link>
          </div>

          {error && <div className="errorMsg">{error}</div>}
          
          {error === "Please verify your email before logging in." && (
            <ResendVerificationButton email={userdata.email} username={userdata.username} />
          )}
          
          <SignInButton isLoading={isLoading} text="Sign In" />
          <p className="p text-[#151717] dark:text-[#e0e0e0]">{`Don't have an account?`} <Link href="/signup" className="span text-[#2d79f3] dark:text-[#4da3ff]">Sign Up</Link></p>
          <div className="flexRow">
            <button type="button" className="btn bg-white dark:bg-[#2a2a2a] text-[#151717] dark:text-[#e0e0e0] border border-[#ededef] dark:border-[#444] hover:border-[#2d79f3] dark:hover:border-[#4da3ff]" onClick={() => signIn('google')}>
              <GoogleSvg />
              Google
            </button>
            <button type="button" className="btn bg-white dark:bg-[#2a2a2a] text-[#151717] dark:text-[#e0e0e0] border border-[#ededef] dark:border-[#444] hover:border-[#2d79f3] dark:hover:border-[#4da3ff]" onClick={() => signIn('apple')}>
              <AppleSvg />
              Apple
            </button>
          </div>
        </form>
      </div>
    </StyledWrapper>
  );
}