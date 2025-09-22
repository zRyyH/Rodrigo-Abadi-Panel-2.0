import { Skeleton } from "@/components/ui/skeleton"

export default function LoadingScreen({
    title = "Carregando...",
    showTitle = true,
    variant = "default"
}) {
    if (variant === "skeleton") {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background">
                <div className="w-full max-w-md space-y-4 p-6">
                    <Skeleton className="h-12 w-3/4 mx-auto" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-4 w-4/6" />
                    <div className="grid grid-cols-2 gap-4 pt-4">
                        <Skeleton className="h-20 w-full" />
                        <Skeleton className="h-20 w-full" />
                    </div>
                </div>
            </div>
        )
    }

    if (variant === "minimal") {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" />
            </div>
        )
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background">
            <div className="flex flex-col items-center space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
                {showTitle && (
                    <p className="text-sm text-muted-foreground animate-pulse">
                        {title}
                    </p>
                )}
            </div>
        </div>
    )
}