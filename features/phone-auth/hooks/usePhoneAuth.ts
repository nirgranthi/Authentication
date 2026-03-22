import { useState } from 'react';
import axios from 'axios';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export const usePhoneAuth = () => {
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState<'initial' | 'phone' | 'otp'>('initial');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const requestOTP = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        setError('');

        const formattedPhone = phone.startsWith('+91') ? phone : `+91${phone}`;

        if (!/^\+91\d{10}$/.test(formattedPhone)) {
            setError('Please enter a valid 10-digit Indian phone number');
            return;
        }

        setIsLoading(true);
        try {
            await axios.post('/api/phone-auth/send-otp', { phone: formattedPhone });
            setPhone(formattedPhone);
            setStep('otp');
        } catch (err: any) {
            setError(err.response?.data?.error || 'Failed to send OTP');
        } finally {
            setIsLoading(false);
        }
    };

    const verifyAndSignIn = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        setError('');
        if (otp.length !== 6) {
            setError('OTP must be 6 digits');
            return;
        }

        setIsLoading(true);
        try {
            const res = await signIn('phone-otp', {
                phone,
                otp,
                redirect: false
            });

            if (res?.error) {
                setError(res.error);
            } else {
                router.push('/');
            }
        } catch (err: any) {
            setError('Failed to verify OTP');
        } finally {
            setIsLoading(false);
        }
    };

    return {
        phone, setPhone,
        otp, setOtp,
        step, setStep,
        isLoading,
        error, setError,
        requestOTP,
        verifyAndSignIn
    };
};
