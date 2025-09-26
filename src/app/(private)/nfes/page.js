"use client";

import { formatDate, formatCurrency } from "@/utils/formatters";
import TableFeature from "@/components/features/TableFeature";
import { configs } from '@/constants/pages/nfes';
import { FileText } from "lucide-react";

export default function NFEsPage() {
    const dataTransformer = (nfes) =>
        nfes.map(nfe => ({
            ...nfe,
            issue_date: formatDate(nfe.issue_date),
            total_amount: formatCurrency(nfe.total_amount)
        }));

    return (
        <TableFeature
            collection="nfes"
            queryConfig={configs.query}
            columns={configs.columns}
            filterConfigs={configs.filters}
            title="NFE"
            icon={FileText}
            dataTransformer={dataTransformer}
            showImage={false}
        />
    );
}