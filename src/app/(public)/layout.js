'use client'

import GuestOnly from '@/guards/GuestOnly';

export default function PublicLayout({ children }) {
    return (
        <GuestOnly to="/products">
            <div>
                <main>
                    {children}
                </main>
            </div>
        </GuestOnly>
    );
}