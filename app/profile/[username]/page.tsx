'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter, useParams } from 'next/navigation'
import { useEffect } from 'react'
import { useDarkMode } from '../../hooks/useDarkMode'
import { DarkModeButton } from '../../components/Buttons'
import { PageWrapper, Card } from '../../styles/ProfileCSS'

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
        <span style={{ fontSize: 14, opacity: 0.6 }}>Loading…</span>
      </PageWrapper>
    )
  }

  if (!session) return null

  return (
    <PageWrapper className={isDarkMode ? 'dark-mode' : ''}>
      <div style={{ padding: '2rem' }}>
        <Card className="card">
          {/* ── Header ── */}
          <div style={{
            background: 'linear-gradient(135deg, #2d79f3 0%, #1a56c4 100%)',
            padding: '28px 28px 60px',
            position: 'relative',
          }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <DarkModeButton isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
            </div>
          </div>

          {/* ── Avatar ── */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-44px', marginBottom: '8px' }}>
            <div
              className="avatar"
              style={{
                width: 88,
                height: 88,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #2d79f3, #1a56c4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 28,
                fontWeight: 700,
                color: '#fff',
                border: '4px solid white',
                boxShadow: '0 4px 16px rgba(45,121,243,0.3)',
                userSelect: 'none',
              }}
            >
              {getInitials(user?.username || user?.name || '?')}
            </div>
          </div>

          {/* ── Name & badge ── */}
          <div style={{ textAlign: 'center', padding: '0 28px 4px' }}>
            <h1 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 6px' }}>
              @{user?.username || urlUsername}
            </h1>
            <span
              className={user?.isVerified ? 'badge-verified' : 'badge-unverified'}
              style={{
                display: 'inline-block',
                fontSize: 12,
                fontWeight: 600,
                borderRadius: 20,
                padding: '3px 12px',
                background: user?.isVerified ? 'rgba(45,121,243,0.1)' : 'rgba(255,77,79,0.1)',
                color: user?.isVerified ? '#2d79f3' : '#ff4d4f',
              }}
            >
              {user?.isVerified ? '✓ Verified' : '✗ Not Verified'}
            </span>
          </div>

          {/* ── Info rows ── */}
          <div style={{ padding: '20px 28px' }}>
            {[
              { label: 'Username', value: user?.username || '—' },
              { label: 'Email', value: user?.email || '—' },
              { label: 'Member since', value: formatDate(user?.createdAt) },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="info-row"
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 0',
                  borderBottom: '1px solid #f0f0f0',
                }}
              >
                <span className="info-label" style={{ fontSize: 13, color: '#888', fontWeight: 500 }}>
                  {label}
                </span>
                <span
                  className="info-value"
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: '#151717',
                    maxWidth: '60%',
                    textAlign: 'right',
                    wordBreak: 'break-all',
                  }}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>

          {/* ── Logout button ── */}
          <div style={{ padding: '4px 28px 28px' }}>
            <button
              className="logout-btn"
              onClick={handleLogout}
              style={{
                width: '100%',
                height: 48,
                borderRadius: 10,
                border: '1.5px solid #ff4d4f44',
                background: 'transparent',
                color: '#ff4d4f',
                fontSize: 15,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Sign Out
            </button>
          </div>
        </Card>
      </div>
    </PageWrapper>
  )
}
