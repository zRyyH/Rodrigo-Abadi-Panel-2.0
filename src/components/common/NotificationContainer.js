"use client";

import { useNotification } from "@/contexts/NotificationContext";
import { Notification } from "@/components/common/Notification";

export function NotificationContainer() {
    const { notifications, removeNotification } = useNotification();

    if (notifications.length === 0) return null;

    return (
        <div className="fixed top-4 right-4 z-50 space-y-2 w-80 max-w-[calc(100vw-2rem)]">
            {notifications.map((notification) => (
                <Notification
                    key={notification.id}
                    type={notification.variant}
                    title={notification.title}
                    message={notification.message}
                    onClose={() => removeNotification(notification.id)}
                    className="animate-in slide-in-from-right-5 duration-500"
                />
            ))}
        </div>
    );
}