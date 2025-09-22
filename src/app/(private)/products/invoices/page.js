"use client";

import TableFeature from "@/components/features/TableFeature";
import { FileText } from "lucide-react";
import { INVOICES_CONFIG } from '@/constants/pages';

export default function invoicesPage() {
    const dataTransformer = (invoices) =>
        invoices.map(invoice => ({
            ...invoice,
            origin: invoice.origin_id?.origin,
        }));

    return (
        <TableFeature
            collection="invoice"
            queryConfig={INVOICES_CONFIG.query}
            columns={INVOICES_CONFIG.columns}
            filterConfigs={INVOICES_CONFIG.filters}
            title="Notas fiscais"
            icon={FileText}
            createRoute="/products/invoices/create"
            detailRoute="/products/invoices/{id}"
            dataTransformer={dataTransformer}
            deleteConfirmField="origin"
            deleteConfirmMessage='Deseja deletar o produto "{origin}"?'
            showImage={false}
        />
    );
}