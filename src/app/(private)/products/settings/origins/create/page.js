"use client";

import EditFeature from "@/components/features/EditFeature";
import { ORIGINS_CONFIG } from "@/constants/pages";

export default function ProductDetails() {
    return (
        <EditFeature
            collection="origins"
            fields={ORIGINS_CONFIG.fields}
            title="Criar Origem"
            redirectPath="/products/settings/origins"
            queryOptions={{ fields: ['*'] }}
            onSuccess={(item) => console.log('Sucesso!', item)}
            mode="create"
        />
    );
}