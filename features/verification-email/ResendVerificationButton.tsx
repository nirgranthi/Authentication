'use client'

import { useState } from 'react'
import axios from 'axios'

export function ResendVerificationButton({ email, username }: { email?: string, username?: string }) {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const [message, setMessage] = useState('')

    const handleResend = async () => {
        if (!email && !username) return;
        setStatus('loading')
        setMessage('')
        
        try {
            await axios.post('/api/verification-email/resend', { email, username })
            setStatus('success')
            setMessage("Verification email sent! Please check your inbox.")
        } catch (error: any) {
            setStatus('error')
            const errMessage = error.response?.data?.message || "Failed to resend email."
            setMessage(errMessage)
        }
    }

    // Determine the button text based on status
    const getButtonText = () => {
        if (status === 'loading') return 'Sending...'
        if (status === 'success') return 'Email Sent!'
        return 'Resend Verification Email'
    }

    return (
        <div className="w-full mt-4 flex flex-col items-center">
            <button
                type="button"
                onClick={handleResend}
                disabled={status === 'loading' || status === 'success'}
                className={`
                    w-full py-2.5 px-4 font-semibold text-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-1 transition-all
                    ${status === 'success' ? 'bg-emerald-500 hover:bg-emerald-600 focus:ring-emerald-500' : 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 focus:ring-indigo-500'}
                    disabled:opacity-75 disabled:cursor-not-allowed
                `}
            >
                {getButtonText()}
            </button>
            {message && (
                <p className={`mt-2 text-sm font-medium ${status === 'error' ? 'text-red-500' : 'text-emerald-500'}`}>
                    {message}
                </p>
            )}
        </div>
    )
}
