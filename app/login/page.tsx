'use client'

import { ChangeEvent, SubmitEvent, useState } from 'react'
import { useDarkMode } from '../hooks/useDarkMode'
import { AppleSvg, EmailSvg, GoogleSvg, PasswordSvg } from '../components/Svgs'
import { StyledWrapper } from '../styles/LoginCSS'
import { validateEmail } from '@/lib/validation'
import Link from 'next/link'
import { signIn, getSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { DarkModeButton, ShowPasswordButton, SignInButton } from '../components/Buttons'

export default function Login() {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useDarkMode(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [userdata, setUserdata] = useState({
    username: '',
    email: '',
    password: ''
  })

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
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
    <StyledWrapper className={isDarkMode ? 'dark-mode' : ''}>
      <div className="wrapper">
        <form className="form" onSubmit={handleSubmit}>
          <div className="flexRow" style={{ marginBottom: '10px' }}>
            <h2>Sign In</h2>
            <DarkModeButton isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
          </div>

          <div className="flexColumn">
            <label>Email </label>
          </div>
          <div className="inputForm">
            <EmailSvg />
            <input placeholder="Enter your Email/Username" className="input" type="text" minLength={4} required
              value={userdata.email || userdata.username} onChange={handleIdentifierChange} />
          </div>

          <div className="flexColumn">
            <label>Password </label>
          </div>
          <div className="inputForm">
            <PasswordSvg />
            <input placeholder="Enter your Password" className="input" type={showPassword ? "text" : "password"} minLength={8} required
              value={userdata.password} onChange={(e) => { setError(''); setUserdata({ ...userdata, password: e.target.value }); }} />
            <ShowPasswordButton showPassword={showPassword} setShowPassword={setShowPassword} />
          </div>

          <div className="flexRow">
            <label className="rememberMe">
              <input type="checkbox" defaultChecked />
              <span>Remember me</span>
            </label>
            <span className="span">Forgot password?</span>
          </div>

          {error && <div className="errorMsg">{error}</div>}
          <SignInButton isLoading={isLoading} text="Sign In" />
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