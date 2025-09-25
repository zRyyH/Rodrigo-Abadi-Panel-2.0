'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useCrudApi } from '@/hooks/useCrudApi'
import { DashboardCards } from '@/components/common/DashboardCards'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import ItemNotFound from '@/components/common/ItemNotFound'
import ErrorPage from '@/components/common/ErrorPage'
import LoadingScreen from '@/components/common/LoadingScreen'

export function DashboardMetric({
    endpoint,
    title = "Métricas",
    description = "Visão geral do desempenho e status atual",
    buildCards
}) {
    const { id } = useParams()
    const { item, loading, error, read } = useCrudApi(`/query/${endpoint}`)

    useEffect(() => {
        if (id) read({ productId: id })
    }, [id])

    if (loading) return <LoadingScreen />
    if (error) return <ErrorPage />
    if (!item?.data?.data?.[0]) return <ItemNotFound />

    const cards = buildCards(item.data.data[0])

    return (
        <Card className="animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
            <CardHeader className="space-y-1.5">
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className="pt-2 pb-2">
                <DashboardCards items={cards} />
            </CardContent>
        </Card>
    )
}