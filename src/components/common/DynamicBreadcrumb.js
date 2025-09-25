// components/features/DynamicBreadcrumb.jsx
"use client";

import { usePathname, useRouter } from 'next/navigation';
import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
    BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { Fragment } from 'react';

export function DynamicBreadcrumb({
    className,
    separator,
    customLabels = {},
    showBackButton = true,
    backButtonLabel = "Voltar"
}) {
    const pathname = usePathname();
    const router = useRouter();

    // Remove barras vazias e filtra
    const segments = pathname.split('/').filter(segment => segment !== '');

    // Função para formatar o label
    const formatLabel = (segment) => {
        // Verifica se existe label customizado
        if (customLabels[segment]) {
            return customLabels[segment];
        }

        // Remove IDs (números ou UUIDs)
        if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(segment)) {
            return 'ID';
        }
        if (/^\d+$/.test(segment)) {
            return 'ID';
        }

        // Formata o texto: remove hífens, capitaliza primeira letra
        return segment
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    // Constrói o path acumulativo
    const buildPath = (index) => {
        return '/' + segments.slice(0, index + 1).join('/');
    };

    // Função para voltar
    const handleBack = () => {
        router.back();
    };

    // Verifica se não está na home
    const showBack = showBackButton && segments.length > 0;

    return (
        <div className={className}>
            <div className="flex items-center gap-4">
                {showBack && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="gap-2"
                    >
                        <ArrowLeftIcon className="size-4" />
                        {backButtonLabel}
                    </Button>
                )}

                <Breadcrumb className="flex-1">
                    <BreadcrumbList>
                        {segments.map((segment, index) => {
                            const isLast = index === segments.length - 1;
                            const isFirst = index === 0;
                            const path = buildPath(index);
                            const label = formatLabel(segment);

                            return (
                                <Fragment key={path}>
                                    {!isFirst && <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>}
                                    <BreadcrumbItem>
                                        {isLast ? (
                                            <BreadcrumbPage>{label}</BreadcrumbPage>
                                        ) : (
                                            <BreadcrumbLink href={path}>
                                                {label}
                                            </BreadcrumbLink>
                                        )}
                                    </BreadcrumbItem>
                                </Fragment>
                            );
                        })}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </div>
    );
}