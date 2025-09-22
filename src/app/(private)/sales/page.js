"use client";

import TableFeature from "@/components/features/TableFeature";
import { FileText } from "lucide-react";
import { SALES_CONFIG } from '@/constants/pages';

export default function salesPage() {
    const dataTransformer = (sales) =>
        sales.map(sale => ({
            ...sale,
        }));

    return (
        <TableFeature
            collection="sales"
            queryConfig={SALES_CONFIG.query}
            columns={SALES_CONFIG.columns}
            filterConfigs={SALES_CONFIG.filters}
            title="Vendas"
            icon={FileText}
            createRoute="/sales/create"
            detailRoute="/sales/{id}"
            dataTransformer={dataTransformer}
            deleteConfirmField="sale_id"
            deleteConfirmMessage='Deseja deletar a venda "{sale_id}"?'
            showImage={false}
        />
    );
}