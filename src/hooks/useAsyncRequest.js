import { useState, useCallback } from 'react';

export function useAsyncRequest() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const run = useCallback(async (fn) => {
        setLoading(true);
        setError(null);

        try {
            return await fn();
        } catch (err) {
            setError(err.message || 'Erro inesperado');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const clearError = useCallback(() => setError(null), []);

    return { loading, error, run, clearError };
}