"use client";

import TableFeature from "@/components/features/TableFeature";
import { configs } from '@/constants/pages/invoices';
import { FileText } from "lucide-react";

export default function InvoicesPage() {
    const dataTransformer = (invoices) =>
        invoices.map(invoice => ({
            ...invoice,
            origin: invoice.origin_id?.origin,
        }));

    return (
        <TableFeature
            collection="invoice"
            queryConfig={configs.query}
            columns={configs.columns}
            filterConfigs={configs.filters}
            title="Notas fiscais"
            icon={FileText}
            createRoute="/invoices/create"
            detailRoute="/invoices/{id}"
            dataTransformer={dataTransformer}
            deleteConfirmField="origin"
            deleteConfirmMessage='Deseja deletar o produto "{origin}"?'
            showImage={false}
        />
    );
}