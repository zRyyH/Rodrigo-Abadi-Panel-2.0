"use client";

import { createContext, useContext, useState, useCallback } from 'react';

export const NotificationContext = createContext();

export function NotificationProvider({ children }) {
    const [notifications, setNotifications] = useState([]);

    const addNotification = useCallback(({ variant = 'success', title, message, duration = 3000 }) => {
        const id = Date.now() + Math.random();
        const notification = { id, variant, title, message };

        setNotifications(prev => [...prev, notification]);

        if (duration > 0) {
            setTimeout(() => {
                removeNotification(id);
            }, duration);
        }

        return id;
    }, []);

    const removeNotification = useCallback((id) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    }, []);

    const showSuccess = useCallback((title, message) => {
        return addNotification({ variant: 'success', title, message });
    }, [addNotification]);

    const showError = useCallback((title, message) => {
        return addNotification({ variant: 'error', title, message });
    }, [addNotification]);

    const showWarning = useCallback((title, message) => {
        return addNotification({ variant: 'warning', title, message });
    }, [addNotification]);

    const clearAll = useCallback(() => {
        setNotifications([]);
    }, []);

    const value = {
        notifications,
        addNotification,
        removeNotification,
        showSuccess,
        showError,
        showWarning,
        clearAll
    };

    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    );
}

export function useNotification() {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification deve ser usado dentro de NotificationProvider');
    }
    return context;
}