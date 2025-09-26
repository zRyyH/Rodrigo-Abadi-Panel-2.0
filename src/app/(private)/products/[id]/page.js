"use client";

import EditFeature from "@/components/features/EditFeature";
import { configs } from "@/constants/pages/products";
import { DynamicBreadcrumb } from '@/components/common/DynamicBreadcrumb';

export default function ProductDetails() {
    return (
        <div className="max-w-4xl mx-auto p-6">
            <DynamicBreadcrumb className="mb-6" />

            <EditFeature
                collection="products"
                fields={configs.fields}
                junctionCollection="products_files"
                junctionCollum="products_id"
                maxImages={3}
                redirectPath="/products"
                options={configs.queryId}
                title="Produto"
            />
        </div>
    );
}