'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import axios from 'axios'
import { StyledWrapper } from '../styles/LoginCSS'
import { useDarkMode } from '../hooks/useDarkMode'

type Status = 'loading' | 'success' | 'error'

export default function VerifyEmailPage() {
    const [status, setStatus] = useState<Status>('loading')
    const [message, setMessage] = useState('')
    const [isDarkMode] = useDarkMode(false)
    const searchParams = useSearchParams()
    const router = useRouter()

    useEffect(() => {
        const token = searchParams.get('token')

        if (!token) {
            setStatus('error')
            setMessage('No verification token provided.')
            return
        }

        // Call the verification API — it will redirect on success,
        // so we only need to handle the error case here.
        axios
            .get(`/api/verifyEmail?token=${token}`)
            .then(() => {
                // If the API resolves (no redirect happened in some edge case),
                // treat it as success.
                setStatus('success')
                setMessage('Email verified! Redirecting to login…')
                setTimeout(() => router.push('/login?verified=true'), 2000)
            })
            .catch((err) => {
                const msg =
                    err?.response?.data?.message ?? 'Invalid or expired verification link.'
                setStatus('error')
                setMessage(msg)
            })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <StyledWrapper className={isDarkMode ? 'dark-mode' : ''}>
            <div className="wrapper">
                <div className="form" style={{ textAlign: 'center', padding: '48px 40px' }}>
                    {status === 'loading' && (
                        <>
                            <div style={styles.spinner} />
                            <h2 style={{ marginTop: '24px', fontSize: '20px' }}>Verifying your email…</h2>
                            <p style={styles.subtitle}>This will only take a moment.</p>
                        </>
                    )}

                    {status === 'success' && (
                        <>
                            <div style={styles.icon}>✅</div>
                            <h2 style={{ marginTop: '16px', fontSize: '22px' }}>Email Verified!</h2>
                            <p style={styles.subtitle}>{message}</p>
                        </>
                    )}

                    {status === 'error' && (
                        <>
                            <div style={styles.icon}>❌</div>
                            <h2 style={{ marginTop: '16px', fontSize: '22px', color: '#ef4444' }}>
                                Verification Failed
                            </h2>
                            <p style={styles.subtitle}>{message}</p>
                            <p style={{ marginTop: '20px', fontSize: '14px', color: '#9ca3af' }}>
                                The link may have expired (10 minutes limit).<br />
                                Please sign up again to receive a new link.
                            </p>
                            <button
                                onClick={() => router.push('/signup')}
                                style={styles.btn}
                            >
                                Back to Sign Up
                            </button>
                        </>
                    )}
                </div>
            </div>

            <style>{`
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </StyledWrapper>
    )
}

const styles: Record<string, React.CSSProperties> = {
    spinner: {
        width: '52px',
        height: '52px',
        borderRadius: '50%',
        border: '4px solid #e5e7eb',
        borderTopColor: '#6366f1',
        animation: 'spin 0.8s linear infinite',
        margin: '0 auto',
    },
    icon: {
        fontSize: '48px',
        lineHeight: 1,
    },
    subtitle: {
        marginTop: '8px',
        fontSize: '15px',
        color: '#6b7280',
    },
    btn: {
        marginTop: '24px',
        padding: '12px 28px',
        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: 600,
        cursor: 'pointer',
    },
}
