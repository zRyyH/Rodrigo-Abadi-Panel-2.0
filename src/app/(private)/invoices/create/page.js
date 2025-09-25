"use client";

import EditFeature from "@/components/features/EditFeature";
import { configs } from "@/constants/pages/invoices";

export default function ProductDetails() {
    return (
        <div className="max-w-2xl mx-auto p-6">
            <EditFeature
                collection="invoice"
                fields={configs.fields}
                redirectPath="/invoices"
                options={configs.queryId}
            />
        </div>
    );
}