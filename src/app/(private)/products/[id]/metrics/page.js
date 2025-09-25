"use client";

import { DashboardMetric } from '@/components/features/DashboardMetric';
import { buildProductCards } from '@/utils/transformers/productMetrics';
import { DynamicBreadcrumb } from '@/components/common/DynamicBreadcrumb';

export default function Dashboard() {
    return (
        <div className="container mx-auto max-w-screen-xl px-4 py-8">
            <DynamicBreadcrumb className="mb-6" />

            <DashboardMetric
                endpoint="productDetails"
                title="Métricas do Produto"
                description="Visão geral do desempenho e status atual"
                buildCards={buildProductCards}
            />
        </div>
    );
}