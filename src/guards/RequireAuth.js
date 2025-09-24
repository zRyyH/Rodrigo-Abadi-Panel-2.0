"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from '@/contexts/AuthContext'

export default function RequireAuth({ to = "/auth", children }) {
    const { user, loading } = useAuth();

    const router = useRouter();
    useEffect(() => {
        if (!loading && !user) router.replace(to);
    }, [loading, user, to, router]);

    if (loading || !user) return null;
    return children;
}