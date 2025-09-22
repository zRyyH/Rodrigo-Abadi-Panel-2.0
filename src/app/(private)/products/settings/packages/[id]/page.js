"use client";

import EditFeature from "@/components/features/EditFeature";
import { PACKAGES_CONFIG } from "@/constants/pages";

export default function ProductDetails() {
    return (
        <EditFeature
            collection="packages"
            fields={PACKAGES_CONFIG.fields}
            title="Editar Embalagem"
            redirectPath="/products/settings/packages"
            queryOptions={{ fields: ['*'] }}
            onSuccess={(item) => console.log('Sucesso!', item)}
            mode="edit"
        />
    );
}