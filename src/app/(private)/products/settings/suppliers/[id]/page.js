"use client";

import EditFeature from "@/components/features/EditFeature";
import { SUPPLIERS_CONFIG } from "@/constants/pages";

export default function ProductDetails() {
    return (
        <EditFeature
            collection="supplier"
            fields={SUPPLIERS_CONFIG.fields}
            title="Editar Fornecedor"
            redirectPath="/products/settings/suppliers"
            queryOptions={{ fields: ['*'] }}
            onSuccess={(item) => console.log('Sucesso!', item)}
            mode="edit"
        />
    );
}