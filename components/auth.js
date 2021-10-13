import React from 'react';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import Login from '../pages/login';

export default function Auth({ Component, pageProps }) {
    const [session, loading] = useSession();
    const router = useRouter();

    if (loading) return null;

    if (!session) return <Login />
    // if (!session) return <Login />

    return <Component {...pageProps} session={session} />
}