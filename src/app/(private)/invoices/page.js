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
            dataTransformer={dataTransformer}
            title="Nota Fiscal"
            icon={FileText}
            editRoute="/invoices/{id}"
            deleteField="id"
            deleteConfirmMessage="Deseja deletar {product_name}?"
            removeAction={true}
            showImage={false}
            editAction={true}
        />
    );
}