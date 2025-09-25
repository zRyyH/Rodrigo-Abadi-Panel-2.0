"use client";

import TableFeature from "@/components/features/TableFeature";
import { configs } from '@/constants/pages/nfes';
import { FileText } from "lucide-react";

export default function NFEsPage() {
    const dataTransformer = (nfes) =>
        nfes.map(nfe => ({
            ...nfe,
        }));

    return (
        <TableFeature
            collection="nfes"
            queryConfig={configs.query}
            columns={configs.columns}
            filterConfigs={configs.filters}
            title="NFEs"
            icon={FileText}
            dataTransformer={dataTransformer}
            showImage={false}
        />
    );
}