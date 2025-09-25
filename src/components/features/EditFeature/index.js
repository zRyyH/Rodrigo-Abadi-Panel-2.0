'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import useFormHook from '@/hooks/useFormHook';
import { useFileUpload } from '@/hooks/useFileUpload';
import DynamicForm from '@/components/common/DynamicForm';
import ImageCarousel from '@/components/common/ImageCarousel';

export default function EditItemForm({
    collection,
    fields = [],
    hasImages = false,
    junctionCollection = null,
    junctionCollum = null,
    maxImages = 5,
    redirectPath = null,
    className = '',
    options = {}
}) {
    const router = useRouter();
    const params = useParams();
    const [mounted, setMounted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Todos os hooks devem estar aqui, antes de qualquer return condicional
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

    // Agora sim, podemos fazer o return condicional
    if (!mounted) {
        return <div>Carregando...</div>;
    }

    const handleSave = async () => {
        try {
            setIsSubmitting(true);
            clearError();

            const savedItem = await saveForm();

            if (junctionCollection && junctionCollum) {
                console.log("CHUPO MUITO:", savedItem.id, junctionCollum)
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
    const isNew = itemId === null;

    console.log("FILES:", files);

    return (
        <div className={`space-y-6 ${className}`}>
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">
                    {isNew ? 'Criar' : 'Editar'} {collection}
                </h1>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                    {error.message || 'Erro ao processar operação'}
                    <button
                        onClick={clearError}
                        className="ml-2 text-red-500 hover:text-red-700"
                    >
                        ×
                    </button>
                </div>
            )}

            <DynamicForm
                fields={fields}
                values={values}
                onFieldChange={handleFieldChange}
                className="space-y-4"
            />

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
                <button
                    onClick={handleSave}
                    disabled={isBusy}
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                    {isBusy ? 'Salvando...' : (isNew ? 'Criar' : 'Atualizar')}
                </button>

                <button
                    onClick={handleCancel}
                    disabled={isBusy}
                    className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 disabled:opacity-50"
                >
                    Cancelar
                </button>
            </div>
        </div>
    );
}