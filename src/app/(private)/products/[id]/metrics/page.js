"use client";

import { DashboardMetric } from '@/components/features/DashboardMetric';
import { buildProductCards } from '@/utils/transformers/productMetrics';

export default function Dashboard() {
    return (
        <DashboardMetric
            endpoint="productDetails"
            title="Métricas do Produto"
            description="Visão geral do desempenho e status atual"
            buildCards={buildProductCards}
        />
    )
}