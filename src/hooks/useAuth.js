"use client";

import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("useAuth deve ser usado dentro de <AuthProvider>");
    }
    return ctx;
}