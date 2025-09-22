"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNotification } from "@/hooks/useNotification";
import AuthForm from "@/components/auth/AuthForm";

export default function AuthPage() {
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);
    const { showError, showSuccess } = useNotification();

    const handleLogin = async ({ email, password }) => {
        setLoading(true);

        try {
            await login(email, password);
            showSuccess("Sucesso", "Login realizado com sucesso!");
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            showError("Erro de Login", error.message || "Erro ao fazer login");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <AuthForm
                onSubmit={handleLogin}
                loading={loading}
            />
        </div>
    );
}