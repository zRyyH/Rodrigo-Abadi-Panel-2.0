"use client";

import TableFeature from "@/components/features/TableFeature";
import { FileText } from "lucide-react";
import { PACKAGES_CONFIG } from '@/constants/pages';

export default function PackagesPage() {
    const dataTransformer = (packages) =>
        packages.map(pack => ({
            ...pack,
        }));

    return (
        <TableFeature
            collection="packages"
            queryConfig={PACKAGES_CONFIG.query}
            columns={PACKAGES_CONFIG.columns}
            filterConfigs={PACKAGES_CONFIG.filters}
            title="Embalagens"
            icon={FileText}
            createRoute="/products/settings/packages/create"
            detailRoute="/products/settings/packages/{id}"
            dataTransformer={dataTransformer}
            deleteConfirmField="type_of_packaging"
            deleteConfirmMessage='Deseja deletar o produto "{type_of_packaging}"?'
            showImage={false}
        />
    );
}