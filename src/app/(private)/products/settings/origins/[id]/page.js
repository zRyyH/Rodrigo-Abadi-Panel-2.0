"use client";

import EditFeature from "@/components/features/EditFeature";
import { PRODUCTS_CONFIG } from "@/constants/pages";

export default function ProductDetails() {
    return (
        <EditFeature
            collection="origins"
            fields={PRODUCTS_CONFIG.fields}
            title="Editar Origem"
            redirectPath="/products/settings/origins"
            queryOptions={{ fields: ['*'] }}
            onSuccess={(item) => console.log('Sucesso!', item)}
            mode="edit"
        />
    );
}