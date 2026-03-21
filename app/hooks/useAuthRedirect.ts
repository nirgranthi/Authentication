import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export function useAuthRedirect() {
    const router = useRouter();
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === 'authenticated') {
            const username = (session?.user as Record<string, unknown>)?.username as string;
            if (username) {
                router.push(`/profile/${username}`);
            } else {
                router.push('/');
            }
        }
    }, [status, session, router]);
}
