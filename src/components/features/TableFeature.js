"use client";

import SearchBar from "@/components/common/SearchBar";
import Table from "@/components/common/Table";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import useDirectusTable from "@/hooks/useDirectusTable";
import { useRouter } from "next/navigation";
import DirectusBaseService from "@/services/base";
import { useEffect, useState } from "react";
import { ConfirmModal } from "@/components/common/ConfirmModal";
import { useNotification } from "@/contexts/NotificationContext";

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
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const { showSuccess, showError } = useNotification();

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

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 50);
        return () => clearTimeout(timer);
    }, []);

    const transformedData = dataTransformer(data);

    const handleDeleteClick = (item) => {
        setItemToDelete(item);
        setConfirmOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!itemToDelete) return;

        try {
            const service = new DirectusBaseService(collection);
            await service.deleteItem(itemToDelete[deleteField]);
            showSuccess('Sucesso', 'Item deletado com sucesso');
            window.location.reload();
        } catch (error) {
            showError('Erro', 'Erro ao deletar o item');
        }
    };

    const getConfirmMessage = () => {
        if (!itemToDelete) return deleteConfirmMessage;

        return deleteConfirmMessage.includes("{")
            ? deleteConfirmMessage.replace(/\{(\w+)\}/g, (match, key) => itemToDelete[key] || match)
            : deleteConfirmMessage;
    };

    const actions = [
        {
            icon: <Trash2 className="w-4 h-4" />,
            variant: 'ghost',
            size: 'icon',
            className: 'text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors',
            onClick: handleDeleteClick
        }
    ];

    const handleRemoveFilter = (key) => {
        delete filters[key];
        setFilters(filters);
    };

    const handleRowClick = detailRoute
        ? (item) => router.push(detailRoute.replace("{id}", item.id))
        : undefined;

    const handleFilterChange = (key, value) => {
        const updatedFilters = { ...filters };

        if (value === null || value === undefined || value === '' ||
            (Array.isArray(value) && value.length === 0)) {
            delete updatedFilters[key];
        } else {
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
                            Criar {title}
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
                        onFilterChange={handleFilterChange}
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

            <ConfirmModal
                open={confirmOpen}
                onOpenChange={setConfirmOpen}
                title="Confirmar exclusão"
                description={getConfirmMessage()}
                confirmText="Deletar"
                cancelText="Cancelar"
                onConfirm={handleConfirmDelete}
                variant="destructive"
            />
        </div>
    );
}