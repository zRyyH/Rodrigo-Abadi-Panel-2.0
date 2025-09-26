"use client";

import EditFeature from "@/components/features/EditFeature";
import { configs } from "@/constants/pages/suppliers";
import { DynamicBreadcrumb } from '@/components/common/DynamicBreadcrumb';

export default function ProductDetails() {
    return (
        <div className="max-w-4xl mx-auto p-6">
            <DynamicBreadcrumb className="mb-6" />
            
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