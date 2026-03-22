'use client'

import { usePhoneAuth } from '../hooks/usePhoneAuth';

export const PhoneSignInButton = () => {
    const {
        phone, setPhone,
        otp, setOtp,
        step, setStep,
        isLoading,
        error, setError,
        requestOTP,
        verifyAndSignIn
    } = usePhoneAuth();

    const baseClassname = "btn bg-white dark:bg-[#2a2a2a] text-[#151717] dark:text-[#e0e0e0] border border-[#ededef] dark:border-[#444] hover:border-[#2d79f3] dark:hover:border-[#4da3ff] w-full mt-2 justify-center";
    const inputClassname = "w-full bg-transparent border-none outline-none text-[#151717] dark:text-[#e0e0e0] placeholder-[#999] dark:placeholder-[#888] px-2 py-1";

    if (step === 'initial') {
        return (
            <button
                type="button"
                className={baseClassname}
                onClick={() => setStep('phone')}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="mr-2 stroke-current">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Sign in with Phone
            </button>
        );
    }

    if (step === 'phone') {
        return (
            <div className="w-full mt-2 flex flex-col gap-2">
                <div className="flexRow items-center border-[1.5px] border-[#ecedec] bg-white dark:bg-[#2a2a2a] dark:border-[#333] focus-within:border-[#2d79f3] dark:focus-within:border-[#4da3ff] rounded-lg p-2">
                    <span className="text-[#151717] dark:text-[#e0e0e0] px-2 border-r border-[#ecedec] dark:border-[#444]">+91</span>
                    <input 
                        type="text" 
                        value={phone.replace('+91', '')} 
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        placeholder="10-digit mobile number" 
                        className={inputClassname}
                        autoFocus
                    />
                </div>
                {error && <div className="text-red-500 text-sm">{error}</div>}
                <div className="flex gap-2">
                    <button type="button" onClick={() => {setStep('initial'); setError(''); setPhone('');}} className="p-2 text-sm text-[#999] hover:text-[#151717] dark:hover:text-[#e0e0e0]">Cancel</button>
                    <button type="button" onClick={requestOTP} disabled={isLoading} className="flex-1 bg-[#2d79f3] text-white rounded-lg py-2 hover:bg-[#1f5ab8] disabled:opacity-50 transition-colors">
                        {isLoading ? 'Sending...' : 'Send OTP'}
                    </button>
                </div>
            </div>
        );
    }

    if (step === 'otp') {
        return (
            <div className="w-full mt-2 flex flex-col gap-2">
                <div className="flexRow items-center border-[1.5px] border-[#ecedec] bg-white dark:bg-[#2a2a2a] dark:border-[#333] focus-within:border-[#2d79f3] dark:focus-within:border-[#4da3ff] rounded-lg p-2">
                    <input 
                        type="text" 
                        value={otp} 
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        placeholder="6-digit OTP" 
                        className={inputClassname}
                        autoFocus
                    />
                </div>
                {error && <div className="text-red-500 text-sm">{error}</div>}
                <div className="flex gap-2">
                    <button type="button" onClick={() => {setStep('phone'); setOtp(''); setError('');}} className="p-2 text-sm text-[#999] hover:text-[#151717] dark:hover:text-[#e0e0e0]">Back</button>
                    <button type="button" onClick={verifyAndSignIn} disabled={isLoading} className="flex-1 bg-[#2d79f3] text-white rounded-lg py-2 hover:bg-[#1f5ab8] disabled:opacity-50 transition-colors">
                        {isLoading ? 'Verifying...' : 'Verify & Sign In'}
                    </button>
                </div>
            </div>
        );
    }

    return null;
};
