'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import LoadingScreen from '@/components/common/LoadingScreen'
import ItemNotFound from '@/components/common/ItemNotFound'
import { useAsyncRequest } from "@/hooks/useAsyncRequest"
import { productServiceApi } from "@/services/products"
import { Separator } from '@/components/ui/separator'
import ErrorPage from '@/components/common/ErrorPage'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export function DashboardMetric({ title = "", description = "" }) {
    const [item, setItem] = useState([]);
    const { id } = useParams()
    const { loading, error, run } = useAsyncRequest();

    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                const response = await run(() => productServiceApi.getProductMetricsById(id));
                setItem(response);
            } catch (err) {
                console.error(err);
            }
        };
        fetchMetrics();
    }, [id]);

    if (loading) return <LoadingScreen />
    if (error) return <ErrorPage />
    if (!item?.length) return <ItemNotFound />

    return (
        <Card className="animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
            <CardHeader className="space-y-1.5">
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6 pb-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {item.map((metric, index) => (
                        <Card key={index}>
                            <CardHeader className="pb-3">
                                <CardDescription className="text-sm">{metric.label}</CardDescription>
                                <CardTitle className="text-2xl">{metric.value}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-xs text-muted-foreground">{metric.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}