'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import useFormHook from '@/hooks/useFormHook';
import { useFileUpload } from '@/hooks/useFileUpload';
import DynamicForm from '@/components/common/DynamicForm';
import ImageCarousel from '@/components/common/ImageCarousel';
import { Button } from "@/components/ui/button";

export default function EditItemForm({
    collection,
    fields = [],
    hasImages = false,
    junctionCollection = null,
    junctionCollum = null,
    maxImages = 5,
    redirectPath = null,
    className = '',
    options = {},
    title = 'Item'
}) {
    const router = useRouter();
    const params = useParams();
    const [mounted, setMounted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const itemId = params.id === 'create' ? null : params.id;

    const {
        values,
        loading,
        error,
        handleFieldChange,
        saveForm,
        clearError
    } = useFormHook(collection, itemId, options);

    const {
        files,
        setFiles,
        remove,
        create
    } = useFileUpload(
        hasImages ? junctionCollection : null,
        junctionCollum,
        itemId
    );

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div>Carregando...</div>;
    }

    const handleSave = async () => {
        try {
            setIsSubmitting(true);
            clearError();

            const savedItem = await saveForm();

            if (junctionCollection && junctionCollum) {
                await create(savedItem.id, junctionCollum)
            }

            if (savedItem) {
                const path = redirectPath || `/${collection}`;
                router.push(path);
            }

        } catch (err) {
            console.error('Erro ao salvar:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        const path = redirectPath || `/${collection}`;
        router.push(path);
    };

    const isBusy = loading || isSubmitting;

    return (
        <div className={`space-y-6 ${className}`}>
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">
                    {itemId ? 'Editar' : 'Criar'} {title}
                </h1>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                    {error.message || 'Erro ao processar operação'}
                    <Button onClick={clearError}>
                        ×
                    </Button>
                </div>
            )}

            <DynamicForm
                fields={fields}
                values={values}
                onChange={handleFieldChange} />

            {hasImages && junctionCollection && (
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Imagens
                    </label>
                    <ImageCarousel
                        images={files}
                        onImagesChange={setFiles}
                        deleteImage={remove}
                        maxImages={maxImages}
                        className="border rounded-lg p-4"
                    />
                </div>
            )}

            <div className="flex gap-3 pt-4">
                <Button onClick={handleSave} disabled={isBusy}>
                    {isBusy ? 'Salvando...' : (itemId ? 'Atualizar' : 'Criar')}
                </Button>

                <Button onClick={handleCancel} disabled={isBusy}>
                    Cancelar
                </Button>
            </div>
        </div>
    );
}