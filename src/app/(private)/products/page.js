"use client";

import TableFeature from "@/components/features/TableFeature";
import { configs } from '@/constants/pages/products';
import { FileText } from "lucide-react";

export default function ProductsPage() {
    const dataTransformer = (products) =>
        products.map(product => ({
            ...product,
            supplier_id: product.supplier_id?.supplier_name,
            package_id: product.package_id?.type_of_packaging
        }));

    return (
        <TableFeature
            collection="products"
            queryConfig={configs.query}
            columns={configs.columns}
            filterConfigs={configs.filters}
            title="Produto"
            icon={FileText}
            createRoute="/products/create"
            detailRoute="/products/{id}"
            dataTransformer={dataTransformer}
            deleteConfirmField="sku"
            deleteConfirmMessage='Deseja deletar o produto "{sku}"?'
            showImage={true}
        />
    );
}