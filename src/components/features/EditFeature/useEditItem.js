import { useEffect, useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { useCrud } from '@/hooks/useCrud';
import { useNotification } from '@/contexts/NotificationContext';

export const useEditItem = (
    collection,
    queryOptions,
    onSuccess,
    onError,
    redirectPath,
    mode = 'edit',
    initialData = {}
) => {
    const router = useRouter();
    const { id } = useParams();
    const { showSuccess, showError } = useNotification();

    // Inicializar formData com valores padrão para evitar undefined
    const [formData, setFormData] = useState(() => {
        if (mode === 'create') {
            return { ...initialData };
        }
        return null;
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [hasLoadedData, setHasLoadedData] = useState(mode === 'create');

    const { item, loading, error, read, update, create, clearError } = useCrud(collection);
    const isCreateMode = mode === 'create';

    // Ref para controlar se já tentou carregar os dados
    const hasAttemptedLoad = useRef(false);
    const lastLoadedId = useRef(null);

    // Inicialização para modo de criação - removido pois já é feito no useState inicial
    // useEffect(() => {
    //     if (isCreateMode && !hasLoadedData) {
    //         setFormData({ ...initialData });
    //         setHasLoadedData(true);
    //     }
    // }, [isCreateMode, hasLoadedData, initialData]);

    // Carregamento de dados para modo de edição
    useEffect(() => {
        if (!isCreateMode && id && collection && !hasAttemptedLoad.current && lastLoadedId.current !== id) {
            hasAttemptedLoad.current = true;
            lastLoadedId.current = id;

            read(id, queryOptions).catch((error) => {
                console.error('Erro ao carregar item:', error);
            });
        }
    }, [id, collection, isCreateMode, read, queryOptions]);

    // Atualiza formData quando item é carregado (apenas para modo edição)
    useEffect(() => {
        if (!isCreateMode && item && !hasLoadedData) {
            setFormData(item);
            setHasLoadedData(true);
        }
    }, [item, isCreateMode, hasLoadedData]);

    // Reset quando ID muda
    useEffect(() => {
        if (!isCreateMode && id !== lastLoadedId.current) {
            hasAttemptedLoad.current = false;
            setHasLoadedData(false);
            setFormData(null);
        }
    }, [id, isCreateMode]);

    const handleSubmit = useCallback(async () => {
        if (!isCreateMode && !id) {
            showError('Erro', 'ID não encontrado');
            return;
        }

        if (!formData) {
            showError('Erro', 'Dados do formulário não encontrados');
            return;
        }

        setIsSubmitting(true);
        clearError();

        try {
            let result;

            if (isCreateMode) {
                result = await create(formData);
                showSuccess('Sucesso', 'Item criado com sucesso!');
            } else {
                result = await update(id, formData);
                showSuccess('Sucesso', 'Item atualizado com sucesso!');
            }

            if (onSuccess) {
                onSuccess(result);
            }

            router.push(redirectPath);

        } catch (err) {
            const errorMessage = isCreateMode
                ? 'Erro ao criar item'
                : 'Erro ao atualizar item';
            showError('Erro', errorMessage);
            onError?.(err);
        } finally {
            setIsSubmitting(false);
        }
    }, [
        isCreateMode,
        id,
        formData,
        create,
        update,
        showSuccess,
        showError,
        clearError,
        onSuccess,
        onError,
        router,
        redirectPath
    ]);

    const handleBack = useCallback(() => {
        router.push(redirectPath);
    }, [router, redirectPath]);

    const handleRetry = useCallback(() => {
        clearError();

        if (isCreateMode) {
            setFormData({ ...initialData });
            setHasLoadedData(true);
        } else {
            setFormData(null);
            setHasLoadedData(false);
            hasAttemptedLoad.current = false;
            lastLoadedId.current = null;

            if (id) {
                hasAttemptedLoad.current = true;
                lastLoadedId.current = id;
                read(id, queryOptions).catch((error) => {
                    console.error('Erro ao tentar novamente:', error);
                });
            }
        }
    }, [isCreateMode, id, clearError, read, queryOptions, initialData]);

    return {
        id,
        formData,
        setFormData,
        isSubmitting,
        loading: !isCreateMode ? loading : false,
        error,
        item,
        handleSubmit,
        handleBack,
        handleRetry,
        isCreateMode,
        hasLoadedData
    };
};