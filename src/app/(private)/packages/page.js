"use client";

import TableFeature from "@/components/features/TableFeature";
import { configs } from '@/constants/pages/packages';
import { FileText } from "lucide-react";

export default function PackagesPage() {
    const dataTransformer = (packages) =>
        packages.map(pack => ({
            ...pack,
        }));

    return (
        <TableFeature
            collection="packages"
            queryConfig={configs.query}
            columns={configs.columns}
            filterConfigs={configs.filters}
            title="Embalagem"
            icon={FileText}
            createRoute="/packages/create"
            detailRoute="/packages/{id}"
            dataTransformer={dataTransformer}
            deleteConfirmField="type_of_packaging"
            deleteConfirmMessage='Deseja deletar o produto "{type_of_packaging}"?'
            showImage={false}
        />
    );
}