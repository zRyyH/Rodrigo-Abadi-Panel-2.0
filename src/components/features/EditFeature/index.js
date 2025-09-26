'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import useFormHook from '@/hooks/useFormHook';
import { useFileUpload } from '@/hooks/useFileUpload';
import { useNotification } from '@/contexts/NotificationContext';
import DynamicForm from '@/components/common/DynamicForm';
import ImageCarousel from '@/components/common/ImageCarousel';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/libs/utils";

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
    const { showSuccess, showError } = useNotification();
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
        return (
            <div className="space-y-4">
                <Skeleton className="h-10 w-64" />
                <Skeleton className="h-96 w-full" />
            </div>
        );
    }

    const handleSave = async () => {
        try {
            setIsSubmitting(true);
            clearError();

            const savedItem = await saveForm();

            if (junctionCollection && junctionCollum) {
                await create(savedItem.id, junctionCollum);
            }

            if (savedItem) {
                showSuccess(
                    'Sucesso',
                    `${title} ${itemId ? 'atualizado' : 'criado'} com sucesso`
                );

                const path = redirectPath || `/${collection}`;
                router.push(path);
            }

        } catch (err) {
            console.error('Erro ao salvar:', err);
            showError(
                'Erro ao salvar',
                err.message || 'Não foi possível salvar as alterações'
            );
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
        <Card className={cn(
            "animate-in slide-in-from-bottom-4 duration-500 max-w-full",
            className
        )}>
            <CardHeader>
                <CardTitle>
                    {itemId ? 'Editar' : 'Criar'} {title}
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
                {error && (
                    <Alert variant="destructive">
                        <AlertTitle>Erro</AlertTitle>
                        <AlertDescription>
                            {error.message || 'Erro ao processar operação'}
                        </AlertDescription>
                    </Alert>
                )}

                <div className={cn(
                    "flex gap-8",
                    hasImages && junctionCollection ? "flex-col lg:flex-row" : ""
                )}>
                    <div className={cn(
                        hasImages && junctionCollection ? "lg:flex-[2] min-w-0" : "w-full"
                    )}>
                        <DynamicForm
                            fields={fields}
                            values={values}
                            onChange={handleFieldChange}
                        />
                    </div>

                    {hasImages && junctionCollection && (
                        <div className="lg:flex-1 space-y-2 min-w-0">
                            <Label>Imagens</Label>
                            <ImageCarousel
                                images={files}
                                onImagesChange={setFiles}
                                deleteImage={remove}
                                maxImages={maxImages}
                                className="border rounded-lg p-4 h-full"
                            />
                        </div>
                    )}
                </div>
            </CardContent>

            <Separator />

            <CardFooter className="flex gap-3">
                <Button onClick={handleSave} disabled={isBusy}>
                    {isBusy ? 'Salvando...' : (itemId ? 'Atualizar' : 'Criar')}
                </Button>

                <Button
                    variant="outline"
                    onClick={handleCancel}
                    disabled={isBusy}
                >
                    Cancelar
                </Button>
            </CardFooter>
        </Card>
    );
}