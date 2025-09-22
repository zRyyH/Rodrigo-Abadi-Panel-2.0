"use client";

import EditFeature from "@/components/features/EditFeature";
import { INVOICES_CONFIG } from "@/constants/pages";

export default function ProductDetails() {
    return (
        <EditFeature
            collection="invoice"
            fields={INVOICES_CONFIG.fields}
            title="Criar Nota"
            redirectPath="/products/invoices"
            queryOptions={{ fields: ['*'] }}
            onSuccess={(item) => console.log('Sucesso!', item)}
            mode="create"
        />
    );
}