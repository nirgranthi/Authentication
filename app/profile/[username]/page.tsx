'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter, useParams } from 'next/navigation'
import { useEffect } from 'react'
import { useTheme } from '../../components/ThemeProvider'
import { DarkModeButton } from '../../components/Buttons'
import { PageWrapper, Card } from '../../styles/ProfileCSS'
import { LogoutSvg } from '../../components/SVGs'

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getInitials(username: string) {
  return username.slice(0, 2).toUpperCase()
}

function formatDate(dateStr: string | undefined) {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ProfilePage() {
  const router = useRouter()
  const params = useParams()
  const urlUsername = params?.username as string
  const { data: session, status } = useSession()
  const { isDarkMode, setIsDarkMode } = useTheme()

  const user = session?.user as {
    name?: string
    email?: string
    username?: string
    isVerified?: boolean
    createdAt?: string
  } | undefined

  // Redirect to login page if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  // If the URL username doesn't match the logged-in user, redirect to their own profile
  useEffect(() => {
    if (status === 'authenticated' && user?.username && urlUsername.toLowerCase() !== user.username.toLowerCase()) {
      router.replace(`/profile/${user.username}`)
    }
  }, [status, user?.username, urlUsername, router])

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/login' })
  }

  if (status === 'loading') {
    return (
      <PageWrapper className="bg-[#f7f7f7] text-[#151717] dark:bg-[#121212] dark:text-[#e0e0e0]">
        <span className="text-[14px] opacity-60">Loading…</span>
      </PageWrapper>
    )
  }

  if (!session) return null

  return (
    <PageWrapper className="bg-[#f7f7f7] text-[#151717] dark:bg-[#121212] dark:text-[#e0e0e0]">
      <div className="p-8">
        <Card className="card bg-white dark:bg-[#1e1e1e] dark:shadow-[0_20px_40px_rgba(0,0,0,0.5),0_5px_15px_rgba(0,0,0,0.3),inset_0_0_0_1px_rgba(255,255,255,0.05),inset_0_2px_0_rgba(255,255,255,0.05)] hover:dark:shadow-[0_30px_50px_rgba(0,0,0,0.6),0_10px_20px_rgba(0,0,0,0.4),inset_0_0_0_1px_rgba(255,255,255,0.05),inset_0_2px_0_rgba(255,255,255,0.05)]">
          {/* ── Header ── */}
          <div className="bg-gradient-to-br from-[#2d79f3] to-[#1a56c4] px-7 pt-7 pb-[60px] relative">
            <div className="flex justify-end">
              <DarkModeButton isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
            </div>
          </div>

          {/* ── Avatar ── */}
          <div className="flex justify-center -mt-11 mb-2">
            <div
              className="avatar w-[88px] h-[88px] rounded-full bg-gradient-to-br from-[#2d79f3] to-[#1a56c4] dark:from-[#4da3ff] dark:to-[#3b8ce0] flex items-center justify-center text-3xl font-bold text-white border-4 border-white shadow-[0_4px_16px_rgba(45,121,243,0.3)] dark:shadow-[0_4px_16px_rgba(77,163,255,0.35)] select-none"
            >
              {getInitials(user?.username || user?.name || '?')}
            </div>
          </div>

          {/* ── Name & badge ── */}
          <div className="text-center px-7 pb-1">
            <h1 className="text-[22px] font-bold mb-1.5">
              @{user?.username || urlUsername}
            </h1>
            <span
              className={`inline-block text-xs font-semibold rounded-[20px] px-3 py-[3px] ${
                user?.isVerified 
                  ? 'bg-[#2d79f3]/10 text-[#2d79f3] dark:bg-[rgba(77,163,255,0.15)] dark:text-[#4da3ff]' 
                  : 'bg-[#ff4d4f]/10 text-[#ff4d4f] dark:bg-[rgba(255,77,79,0.15)] dark:text-[#ff6b6d]'
              }`}
            >
              {user?.isVerified ? '✓ Verified' : '✗ Not Verified'}
            </span>
          </div>

          {/* ── Info rows ── */}
          <div className="px-7 py-5">
            {[
              { label: 'Username', value: user?.username || '—' },
              { label: 'Email', value: user?.email || '—' },
              { label: 'Member since', value: formatDate(user?.createdAt) },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="info-row flex justify-between items-center py-3 border-b border-[#f0f0f0] dark:border-[#2a2a2a]"
              >
                <span className="info-label text-[13px] text-[#888] font-medium">
                  {label}
                </span>
                <span
                  className="info-value text-sm font-semibold text-[#151717] dark:text-[#e0e0e0] max-w-[60%] text-right break-all"
                >
                  {value}
                </span>
              </div>
            ))}
          </div>

          {/* ── Logout button ── */}
          <div className="px-7 pt-1 pb-7">
            <button
              className="logout-btn w-full h-12 rounded-[10px] border-[1.5px] border-[#ff4d4f]/25 bg-transparent text-[#ff4d4f] dark:bg-[#2a2a2a] dark:text-[#ff6b6d] dark:border-[#ff6b6d44] text-[15px] font-semibold cursor-pointer transition-all duration-200 flex items-center justify-center gap-2 hover:bg-[#ff4d4f]/5 dark:hover:bg-[#ff4d4f] dark:hover:text-[#fff] dark:hover:border-[#ff4d4f]"
              onClick={handleLogout}
            >
              <LogoutSvg />
              Sign Out
            </button>
          </div>
        </Card>
      </div>
    </PageWrapper>
  )
}
