"use client";

import TableFeature from "@/components/features/TableFeature";
import { FileText } from "lucide-react";
import { NFES_CONFIG } from '@/constants/pages';

export default function nfesPage() {
    const dataTransformer = (nfes) =>
        nfes.map(nfe => ({
            ...nfe,
        }));

    return (
        <TableFeature
            collection="nfes"
            queryConfig={NFES_CONFIG.query}
            columns={NFES_CONFIG.columns}
            filterConfigs={NFES_CONFIG.filters}
            title="NFEs"
            icon={FileText}
            createRoute="/sales/create"
            detailRoute="/nfes/{id}"
            dataTransformer={dataTransformer}
            deleteConfirmField="invoice_number"
            deleteConfirmMessage='Deseja deletar a "{invoice_number}"?'
            showImage={false}
        />
    );
}