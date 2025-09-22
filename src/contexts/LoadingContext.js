"use client";

import { createContext, useContext, useState, useCallback } from 'react';
import LoadingScreen from '@/components/common/LoadingScreen';

export const LoadingContext = createContext();

export function LoadingProvider({ children }) {
    const [loading, setLoading] = useState(false);
    const [loadingTitle, setLoadingTitle] = useState('Carregando...');

    const showLoading = useCallback((title = 'Carregando...') => {
        setLoadingTitle(title);
        setLoading(true);
    }, []);

    const hideLoading = useCallback(() => {
        setLoading(false);
    }, []);

    const value = {
        loading,
        showLoading,
        hideLoading
    };

    return (
        <LoadingContext.Provider value={value}>
            {children}
            {loading && (
                <LoadingScreen title={loadingTitle} />
            )}
        </LoadingContext.Provider>
    );
}

export function useLoading() {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error('useLoading deve ser usado dentro de LoadingProvider');
    }
    return context;
}