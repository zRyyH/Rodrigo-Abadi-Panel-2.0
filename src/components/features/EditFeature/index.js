import { useEditItem } from './useEditItem';
import { LoadingState } from './LoadingState';
import { ErrorState } from './ErrorState';
import { EditForm } from './EditForm';
import { useMemo } from 'react';

const EditPage = ({
    collection,
    fields = [],
    title,
    redirectPath = '/',
    queryOptions = {},
    onSuccess,
    onError,
    mode = 'edit',
    initialData = {}
}) => {
    const isCreateMode = mode === 'create';
    const defaultTitle = isCreateMode ? 'Criar Novo Item' : 'Editar Item';

    // Preparar dados iniciais com valores seguros
    const safeInitialData = useMemo(() => {
        const safe = { ...initialData };

        // Para modo de criação, garantir que todos os campos tenham valores iniciais
        if (isCreateMode && fields.length > 0) {
            fields.forEach(field => {
                const fieldName = field.name || field.key;
                if (fieldName && !(fieldName in safe)) {
                    switch (field.type) {
                        case 'number':
                            safe[fieldName] = '';
                            break;
                        case 'boolean':
                        case 'checkbox':
                            safe[fieldName] = false;
                            break;
                        case 'select':
                        case 'multiselect':
                            safe[fieldName] = field.multiple ? [] : '';
                            break;
                        case 'date':
                        case 'datetime':
                            safe[fieldName] = '';
                            break;
                        case 'textarea':
                        case 'text':
                        case 'email':
                        case 'password':
                        default:
                            safe[fieldName] = '';
                            break;
                    }
                }
            });
        }

        return safe;
    }, [initialData, isCreateMode, fields]);

    const {
        id,
        formData,
        setFormData,
        isSubmitting,
        loading,
        error,
        item,
        handleSubmit,
        handleBack,
        handleRetry,
        hasLoadedData
    } = useEditItem(
        collection,
        queryOptions,
        onSuccess,
        onError,
        redirectPath,
        mode,
        safeInitialData
    );

    // Para modo de criação, não precisa de loading
    // Para modo de edição, aguarda carregamento dos dados
    if ((!isCreateMode && (loading || !hasLoadedData)) || (isCreateMode && !hasLoadedData)) {
        return <LoadingState />;
    }

    // Verificações de erro baseadas no modo
    const hasError = error ||
        (!isCreateMode && !loading && !item && id) ||
        (!isCreateMode && !id);

    if (hasError) {
        return (
            <div className="animate-in slide-in-from-bottom-4 fade-in duration-500">
                <ErrorState
                    error={error}
                    id={id}
                    onRetry={handleRetry}
                    onBack={handleBack}
                    mode={mode}
                />
            </div>
        );
    }

    // Para ambos os modos, garante que formData existe
    if (!formData) {
        return <LoadingState />;
    }

    return (
        <div className="animate-in slide-in-from-bottom-4 fade-in duration-500">
            <EditForm
                title={title || defaultTitle}
                fields={fields}
                formData={formData}
                onFormChange={setFormData}
                onSubmit={handleSubmit}
                onBack={handleBack}
                isSubmitting={isSubmitting}
                mode={mode}
            />
        </div>
    );
};

export default EditPage;