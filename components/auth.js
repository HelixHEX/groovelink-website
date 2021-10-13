import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import Login from '../pages/login';
import axios from 'axios';

export default function Auth({ Component, pageProps }) {
    const [session, loading] = useSession();
    const [user, setUser] = useState()
    const router = useRouter();

    if (loading) return null;

    if (!session) return <Login />

    return <Component {...pageProps} session={session} user={user} />
}