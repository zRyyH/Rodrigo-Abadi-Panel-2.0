"use client";

import TableFeature from "@/components/features/TableFeature";
import { configs } from '@/constants/pages/origins';
import { FileText } from "lucide-react";

export default function OriginsPage() {
    const dataTransformer = (origins) =>
        origins.map(origin => ({
            ...origin,
        }));

    return (
        <TableFeature
            collection="origins"
            queryConfig={configs.query}
            columns={configs.columns}
            filterConfigs={configs.filters}
            title="Origem"
            icon={FileText}
            createRoute="/origins/create"
            dataTransformer={dataTransformer}
            deleteConfirmField="origin"
            deleteConfirmMessage='Deseja deletar "{origin}"?'
            editRoute="/origins/{id}"
            editAction={true}
            removeAction={true}
            showImage={false}
        />
    );
}