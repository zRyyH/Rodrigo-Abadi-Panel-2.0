"use client";

import TableFeature from "@/components/features/TableFeature";
import { FileText } from "lucide-react";
import { ORIGINS_CONFIG } from '@/constants/pages';

export default function OriginsPage() {
    const dataTransformer = (origins) =>
        origins.map(origin => ({
            ...origin,
        }));

    return (
        <TableFeature
            collection="origins"
            queryConfig={ORIGINS_CONFIG.query}
            columns={ORIGINS_CONFIG.columns}
            filterConfigs={ORIGINS_CONFIG.filters}
            title="Origens"
            icon={FileText}
            createRoute="/products/settings/origins/create"
            detailRoute="/products/settings/origins/{id}"
            dataTransformer={dataTransformer}
            deleteConfirmField="origin"
            deleteConfirmMessage='Deseja deletar o produto "{origin}"?'
            showImage={false}
        />
    );
}