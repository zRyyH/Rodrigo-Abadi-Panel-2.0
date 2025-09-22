"use client";

import { useContext } from "react";
import { NotificationContext } from "@/contexts/NotificationContext";

export function useNotification() {
    const ctx = useContext(NotificationContext);
    if (!ctx) {
        throw new Error("useNotification deve ser usado dentro de <NotificationProvider>");
    }
    return ctx;
}