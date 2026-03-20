'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter, useParams } from 'next/navigation'
import { useEffect } from 'react'
import { useDarkMode } from '../../hooks/useDarkMode'
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
  const [isDarkMode, setIsDarkMode] = useDarkMode(false)

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
    if (status === 'authenticated' && user?.username && urlUsername !== user.username) {
      router.replace(`/profile/${user.username}`)
    }
  }, [status, user?.username, urlUsername, router])

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/login' })
  }

  if (status === 'loading') {
    return (
      <PageWrapper className={isDarkMode ? 'dark-mode' : ''}>
        <span className="text-[14px] opacity-60">Loading…</span>
      </PageWrapper>
    )
  }

  if (!session) return null

  return (
    <PageWrapper className={isDarkMode ? 'dark-mode' : ''}>
      <div className="p-8">
        <Card className="card">
          {/* ── Header ── */}
          <div className="bg-gradient-to-br from-[#2d79f3] to-[#1a56c4] px-7 pt-7 pb-[60px] relative">
            <div className="flex justify-end">
              <DarkModeButton isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
            </div>
          </div>

          {/* ── Avatar ── */}
          <div className="flex justify-center -mt-11 mb-2">
            <div
              className="avatar w-[88px] h-[88px] rounded-full bg-gradient-to-br from-[#2d79f3] to-[#1a56c4] flex items-center justify-center text-3xl font-bold text-white border-4 border-white shadow-[0_4px_16px_rgba(45,121,243,0.3)] select-none"
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
                  ? 'bg-[#2d79f3]/10 text-[#2d79f3]' 
                  : 'bg-[#ff4d4f]/10 text-[#ff4d4f]'
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
                className="info-row flex justify-between items-center py-3 border-b border-[#f0f0f0]"
              >
                <span className="info-label text-[13px] text-[#888] font-medium">
                  {label}
                </span>
                <span
                  className="info-value text-sm font-semibold text-[#151717] max-w-[60%] text-right break-all"
                >
                  {value}
                </span>
              </div>
            ))}
          </div>

          {/* ── Logout button ── */}
          <div className="px-7 pt-1 pb-7">
            <button
              className="logout-btn w-full h-12 rounded-[10px] border-[1.5px] border-[#ff4d4f]/25 bg-transparent text-[#ff4d4f] text-[15px] font-semibold cursor-pointer transition-all duration-200 flex items-center justify-center gap-2 hover:bg-[#ff4d4f]/5"
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
