"use client";

import TableFeature from "@/components/features/TableFeature";
import { formatCurrency } from "aqvs/utils_formatters";
import { configs } from '@/constants/pages/products';
import { FileText } from "lucide-react";

export default function ProductsPage() {
    const dataTransformer = (products) =>
        products.map(product => ({
            ...product,
            supplier_id: product.supplier_id?.supplier_name,
            package_id: product.package_id?.type_of_packaging,
            purchase_cost: formatCurrency(purchase_cost)
        }));

    return (
        <TableFeature
            collection="products"
            queryConfig={configs.query}
            columns={configs.columns}
            filterConfigs={configs.filters}
            dataTransformer={dataTransformer}
            title="Produto"
            icon={FileText}
            showImage={true}
            detailRoute="/products/{id}/metrics"
            editRoute="products/{id}"
            deleteField="id"
            deleteConfirmMessage="Deseja deletar o usuário {sku}?"
            removeAction={true}
            editAction={true}
        />
    );
}