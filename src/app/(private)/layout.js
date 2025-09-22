'use client'

import RequireAuth from "@/guards/RequireAuth";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function PublicLayout({ children }) {
    return (
        <RequireAuth to="/auth">
            <div className="flex min-h-screen flex-col">
                <Header />
                <main className="flex-1">
                    {children}
                </main>
                <Footer />
            </div>
        </RequireAuth>
    );
}