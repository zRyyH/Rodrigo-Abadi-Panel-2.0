"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/libs/utils"

export function DashboardCards({ items = [], className }) {
    if (!items.length) return null

    return (
        <div
            className={cn(
                "grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
                className
            )}
        >
            {items.map((item, index) => (
                <Card key={index}>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            {item.label}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{item.value}</div>
                        {item.description && (
                            <p className="text-xs text-muted-foreground mt-1">
                                {item.description}
                            </p>
                        )}
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}