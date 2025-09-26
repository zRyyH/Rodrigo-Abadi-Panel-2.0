"use client";

import EditFeature from "@/components/features/EditFeature";
import { configs } from "@/constants/pages/origins";
import { DynamicBreadcrumb } from '@/components/common/DynamicBreadcrumb';

export default function ProductDetails() {
    return (
        <div className="max-w-4xl mx-auto p-6">
            <DynamicBreadcrumb className="mb-6" />
            
            <EditFeature
                collection="origins"
                fields={configs.fields}
                redirectPath="/origins"
                options={configs.queryId}
                title="Origem"
            />
        </div>
    );
}