import { useState, useEffect, useCallback } from 'react';
import useCrud from '@/hooks/useCrud';

const useDynamicForm = (collection, itemId = null) => {
    const [values, setValues] = useState({});
    const [initialValues, setInitialValues] = useState({});
    const [isDirty, setIsDirty] = useState(false);

    const {
        item,
        loading,
        error,
        read,
        create,
        update,
        clearError
    } = useCrud(collection);

    // Carrega item existente se itemId fornecido
    useEffect(() => {
        if (itemId) {
            read(itemId);
        }
    }, [itemId, read]);

    // Atualiza valores quando item é carregado
    useEffect(() => {
        if (item) {
            setValues(item);
            setInitialValues(item);
            setIsDirty(false);
        }
    }, [item]);

    // Manipula mudanças nos campos
    const handleFieldChange = useCallback((fieldName, newValue) => {
        setValues(prev => {
            const updated = { ...prev, [fieldName]: newValue };
            setIsDirty(JSON.stringify(updated) !== JSON.stringify(initialValues));
            return updated;
        });
    }, [initialValues]);

    // Reseta formulário
    const resetForm = useCallback(() => {
        setValues(initialValues);
        setIsDirty(false);
        clearError();
    }, [initialValues, clearError]);

    // Salva formulário
    const saveForm = useCallback(async () => {
        try {
            let result;
            if (itemId) {
                result = await update(itemId, values);
            } else {
                result = await create(values);
            }

            setInitialValues(values);
            setIsDirty(false);
            return result;
        } catch (err) {
            throw err;
        }
    }, [itemId, values, update, create]);

    // Valida se formulário pode ser salvo
    const canSave = !loading && isDirty && Object.keys(values).length > 0;

    return {
        values,
        loading,
        error,
        isDirty,
        canSave,
        handleFieldChange,
        saveForm,
        resetForm,
        clearError
    };
};

export default useDynamicForm;