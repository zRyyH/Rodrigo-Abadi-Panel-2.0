"use client";

import EditFeature from "@/components/features/EditFeature";
import { configs } from "@/constants/pages/products";

export default function ProductDetails() {
    return (
        <div className="max-w-2xl mx-auto p-6">
            <EditFeature
                collection="products"
                fields={configs.fields}
                hasImages={true}
                junctionCollection="products_files"
                junctionCollum="products_id"
                maxImages={3}
                redirectPath="/products"
                options={configs.queryId}
            />
        </div>
    );
}