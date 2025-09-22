"use client";

import React, {
    createContext,
    useCallback,
    useEffect,
    useMemo,
    useState,
    useContext,
} from "react";
import { authService } from "../services/auth";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                const me = await authService.getMe();
                if (mounted) setUser(me);
            } catch {
                if (mounted) setUser(null);
            } finally {
                if (mounted) setLoading(false);
            }
        })();
        return () => {
            mounted = false;
        };
    }, []);

    const login = useCallback(async (email, password) => {
        const me = await authService.login(email, password);
        setUser(me);
        return me;
    }, []);

    const logout = useCallback(async () => {
        await authService.logout();
        setUser(null);
    }, []);

    const value = useMemo(
        () => ({
            user,
            loading,
            login,
            logout,
        }),
        [user, loading, login, logout]
    );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>);
}

export function useAuth() {
    return useContext(AuthContext);
}