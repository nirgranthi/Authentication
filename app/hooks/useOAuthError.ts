import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

export function useOAuthError() {
    const searchParams = useSearchParams();
    
    return useMemo(() => {
        const errorParam = searchParams.get('error');
        if (!errorParam) return null;
        
        if (errorParam === 'OAuthSignin' || errorParam === 'OAuthCallback' || errorParam === 'OAuthCreateAccount') {
            return "An error occurred during social authentication.";
        } else if (errorParam === 'AccessDenied') {
            return "Access denied. Please try again.";
        } else if (errorParam === 'CredentialsSignin') {
            return "Invalid username/email or password.";
        } else {
            return decodeURIComponent(errorParam);
        }
    }, [searchParams]);
}
