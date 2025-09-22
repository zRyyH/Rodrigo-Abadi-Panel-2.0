"use client";

import TableFeature from "@/components/features/TableFeature";
import { FileText } from "lucide-react";
import { SUPPLIERS_CONFIG } from '@/constants/pages';

export default function SuppliersPage() {
    const dataTransformer = (suppliers) =>
        suppliers.map(supplier => ({
            ...supplier,
        }));

    return (
        <TableFeature
            collection="supplier"
            queryConfig={SUPPLIERS_CONFIG.query}
            columns={SUPPLIERS_CONFIG.columns}
            filterConfigs={SUPPLIERS_CONFIG.filters}
            title="Fornecedores"
            icon={FileText}
            createRoute="/products/settings/suppliers/create"
            detailRoute="/products/settings/suppliers/{id}"
            dataTransformer={dataTransformer}
            deleteConfirmField="supplier_name"
            deleteConfirmMessage='Deseja deletar o produto "{supplier_name}"?'
            showImage={false}
        />
    );
}