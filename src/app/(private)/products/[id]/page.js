"use client";

import EditFeature from "@/components/features/EditFeature";
import { PRODUCTS_CONFIG } from "@/constants/pages";

export default function ProductDetails() {
    return (
        <EditFeature
            collection="products"
            fields={PRODUCTS_CONFIG.fields}
            title="Editar Produto"
            redirectPath="/products"
            queryOptions={{ fields: ['*'] }}
            onSuccess={(item) => console.log('Sucesso!', item)}
            mode="edit"
        />
    );
}