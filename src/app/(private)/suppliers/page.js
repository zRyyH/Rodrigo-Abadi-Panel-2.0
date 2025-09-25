"use client";

import TableFeature from "@/components/features/TableFeature";
import { configs } from '@/constants/pages/suppliers';
import { FileText } from "lucide-react";

export default function SuppliersPage() {
    const dataTransformer = (suppliers) =>
        suppliers.map(supplier => ({
            ...supplier,
        }));

    return (
        <TableFeature
            collection="supplier"
            queryConfig={configs.query}
            columns={configs.columns}
            filterConfigs={configs.filters}
            title="Fornecedor"
            icon={FileText}
            createRoute="/suppliers/create"
            dataTransformer={dataTransformer}
            deleteConfirmField="supplier_name"
            deleteConfirmMessage='Deseja deletar "{supplier_name}"?'
            editRoute="/suppliers/{id}"
            editAction={true}
            removeAction={true}
            showImage={false}
        />
    );
}