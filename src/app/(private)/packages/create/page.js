"use client";

import EditFeature from "@/components/features/EditFeature";
import { configs } from "@/constants/pages/packages";

export default function ProductDetails() {
    return (
        <div className="max-w-2xl mx-auto p-6">
            <EditFeature
                collection="packages"
                fields={configs.fields}
                redirectPath="/packages"
                options={configs.queryId}
                title="Embalagem"
            />
        </div>
    );
}