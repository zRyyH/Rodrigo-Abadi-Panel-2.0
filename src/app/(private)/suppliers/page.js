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
            title="Fornecedores"
            icon={FileText}
            createRoute="/suppliers/create"
            detailRoute="/suppliers/{id}"
            dataTransformer={dataTransformer}
            deleteConfirmField="supplier_name"
            deleteConfirmMessage='Deseja deletar o produto "{supplier_name}"?'
            showImage={false}
        />
    );
}