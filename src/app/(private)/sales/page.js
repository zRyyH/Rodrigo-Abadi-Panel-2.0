"use client";

import TableFeature from "@/components/features/TableFeature";
import { configs } from '@/constants/pages/sales';
import { FileText } from "lucide-react";

export default function salesPage() {
    const dataTransformer = (sales) =>
        sales.map(sale => ({
            ...sale,
        }));

    return (
        <TableFeature
            collection="sales"
            queryConfig={configs.query}
            columns={configs.columns}
            filterConfigs={configs.filters}
            title="Venda"
            icon={FileText}
            detailRoute="/sales/{id}"
            dataTransformer={dataTransformer}
            deleteConfirmField="sale_id"
            deleteConfirmMessage='Deseja deletar a venda "{sale_id}"?'
            showImage={false}
        />
    );
}