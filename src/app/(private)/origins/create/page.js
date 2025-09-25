"use client";

import EditFeature from "@/components/features/EditFeature";
import { configs } from "@/constants/pages/origins";

export default function ProductDetails() {
    return (
        <div className="max-w-2xl mx-auto p-6">
            <EditFeature
                collection="origins"
                fields={configs.fields}
                redirectPath="/origins"
                options={configs.queryId}
            />
        </div>
    );
}