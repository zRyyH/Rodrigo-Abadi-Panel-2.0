"use client";

import TableFeature from "@/components/features/TableFeature";
import { FileText } from "lucide-react";
import { PRODUCTS_CONFIG } from '@/constants/pages';

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
            queryConfig={PRODUCTS_CONFIG.query}
            columns={PRODUCTS_CONFIG.columns}
            filterConfigs={PRODUCTS_CONFIG.filters}
            title="Produtos"
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