"use client";

import SearchBar from "@/components/common/SearchBar";
import Table from "@/components/common/Table";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import useDirectusTable from "@/hooks/useDirectusTable";
import { useRouter } from "next/navigation";
import DirectusBaseService from "@/services/base";
import { useEffect, useState } from "react";

export default function TableFeature({
    // Configurações da tabela
    collection,
    queryConfig,
    columns,
    filterConfigs = [],

    // Configurações da página
    title,
    icon: Icon,
    createRoute,
    detailRoute,

    // Transformações de dados
    dataTransformer = (data) => data,

    // Configurações de ações
    deleteField = "id",
    deleteConfirmField = "id",
    deleteConfirmMessage = "Deseja deletar este item?",

    // Customizações da tabela
    showImage = false,
    itemsPerPage = 25
}) {
    const router = useRouter();
    const [isVisible, setIsVisible] = useState(false);

    const {
        data,
        loading,
        search,
        filters,
        setSearch,
        setFilters,
        clearFilters,
        page,
        setPage,
        meta
    } = useDirectusTable(collection, queryConfig);

    // Ativa as animações após o componente montar
    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 50);
        return () => clearTimeout(timer);
    }, []);

    const transformedData = dataTransformer(data);

    const handleDelete = async (item) => {
        const confirmText = deleteConfirmMessage.includes("{")
            ? deleteConfirmMessage.replace(/\{(\w+)\}/g, (match, key) => item[key] || match)
            : deleteConfirmMessage;

        if (confirm(confirmText)) {
            try {
                const service = new DirectusBaseService(collection);
                await service.deleteItem(item[deleteField]);
                window.location.reload();
            } catch (error) {
                alert('Erro ao deletar o item');
            }
        }
    };

    const actions = [
        {
            label: 'Deletar',
            icon: <Trash2 className="w-4 h-4" />,
            variant: 'destructive',
            onClick: handleDelete
        }
    ];

    const handleRemoveFilter = (key) => {
        console.log('removendo:', filters[key])
        delete filters[key];
        setFilters(filters);
    }

    const handleRowClick = detailRoute
        ? (item) => router.push(detailRoute.replace("{id}", item.id))
        : undefined;

    // CORREÇÃO: Função para lidar com mudanças de filtro
    const handleFilterChange = (key, value) => {
        console.log(key, value, filters)

        const updatedFilters = { ...filters };

        // Remove o filtro se o valor for null/undefined/vazio/array vazio
        if (value === null || value === undefined || value === '' ||
            (Array.isArray(value) && value.length === 0)) {
            // Remove completamente a chave do objeto filters
            delete updatedFilters[key];
        } else {
            // Define o novo valor
            updatedFilters[key] = value;
        }

        setFilters(updatedFilters);
    };

    return (
        <div className="container mx-auto p-6 space-y-6">
            <div
                className={`bg-white rounded-lg shadow p-6 transition-all duration-500 ${isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                    }`}
            >
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        {Icon && <Icon className="w-6 h-6 text-gray-700" />}
                        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
                    </div>
                    {createRoute && (
                        <Button onClick={() => router.push(createRoute)}>
                            Novo {title.slice(0, -1)}
                        </Button>
                    )}
                </div>

                {filterConfigs.length > 0 && (
                    <SearchBar
                        placeholder={`Buscar ${title.toLowerCase()}...`}
                        searchValue={search}
                        onSearchChange={setSearch}
                        filterConfigs={filterConfigs}
                        selectedFilters={filters}
                        onFilterChange={handleFilterChange} // Usar a função corrigida
                        removeFilter={handleRemoveFilter}
                        onClearFilters={clearFilters}
                    />
                )}
            </div>

            <div
                className={`bg-white rounded-lg shadow transition-all duration-500 delay-100 ${isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                    }`}
            >
                <Table
                    data={transformedData}
                    columns={columns}
                    actions={actions}
                    clickable={!!handleRowClick}
                    onRowClick={handleRowClick}
                    idField="id"
                    currentPage={page}
                    totalPages={Math.ceil((meta?.total_count || 0) / itemsPerPage)}
                    onPageChange={setPage}
                    showImage={showImage}
                />
            </div>
        </div>
    );
}