import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { X, Bell, AlertCircle, CheckCircle, Info } from 'lucide-react'
import { useState, useEffect } from 'react'

const iconMap = {
    info: Info,
    success: CheckCircle,
    warning: AlertCircle,
    error: AlertCircle
}

const variantMap = {
    info: 'default',
    success: 'default',
    warning: 'default',
    error: 'destructive'
}

function cn(...classes) {
    return classes.filter(Boolean).join(' ')
}

export function Notification({
    type = 'info',
    title,
    message,
    timestamp,
    unread = false,
    onClose,
    onMarkRead,
    className,
    ...props
}) {
    const Icon = iconMap[type]
    const [isVisible, setIsVisible] = useState(false)
    const [isExiting, setIsExiting] = useState(false)

    useEffect(() => {
        setIsVisible(true)
    }, [])

    const handleClose = () => {
        setIsExiting(true)
        setTimeout(() => onClose && onClose(), 300)
    }

    return (
        <div className={cn(
            'transition-all duration-300 ease-out',
            isVisible && !isExiting ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        )}>
            <Alert
                variant={variantMap[type]}
                className={cn(
                    'w-full max-w-sm',
                    unread && 'bg-blue-50 border-blue-200',
                    className
                )}
                {...props}
            >
                <Icon className="size-4" />

                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                        <AlertTitle className="text-sm font-medium truncate">
                            {title}
                        </AlertTitle>

                        <div className="flex items-center gap-1 shrink-0">
                            {unread && (
                                <Badge variant="secondary" className="h-4 px-1 text-xs">
                                    Novo
                                </Badge>
                            )}

                            {timestamp && (
                                <span className="text-xs text-muted-foreground">
                                    {timestamp}
                                </span>
                            )}

                            {unread && onMarkRead && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-5 w-5 p-0 hover:scale-110 transition-transform"
                                    onClick={onMarkRead}
                                >
                                    <Bell className="size-3" />
                                </Button>
                            )}

                            {onClose && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-5 w-5 p-0 hover:scale-110 transition-transform"
                                    onClick={handleClose}
                                >
                                    <X className="size-3" />
                                </Button>
                            )}
                        </div>
                    </div>

                    {message && (
                        <AlertDescription className="text-sm mt-1">
                            {message}
                        </AlertDescription>
                    )}
                </div>
            </Alert>
        </div>
    )
}