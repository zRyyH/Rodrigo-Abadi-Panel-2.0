"use client";

import EditFeature from "@/components/features/EditFeature";
import { configs } from "@/constants/pages/suppliers";

export default function ProductDetails() {
    return (
        <div className="max-w-2xl mx-auto p-6">
            <EditFeature
                collection="supplier"
                fields={configs.fields}
                redirectPath="/suppliers"
                options={configs.queryId}
                title="Fornecedor"
            />
        </div>
    );
}