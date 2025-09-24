import { useState, useEffect, useCallback } from 'react';
import { useCrud } from './useCrud';

const useFormHook = (collection, itemId = null, options = {}) => {
    const { create, update, read, loading, error, clearError } = useCrud(collection);

    const [values, setValues] = useState({});
    const [initialValues, setInitialValues] = useState({});
    const [isDirty, setIsDirty] = useState(false);

    useEffect(() => {
        if (itemId) {
            read(itemId, options).then((fetched) => {
                setValues(fetched);
                setInitialValues(fetched);
                setIsDirty(false);
            }).catch(() => { });
        }
    }, [itemId]);

    const handleFieldChange = useCallback((field, newValue) => {
        setValues(prev => {
            const updated = { ...prev, [field]: newValue };
            setIsDirty(JSON.stringify(updated) !== JSON.stringify(initialValues));
            return updated;
        });
    }, [initialValues]);

    const resetForm = useCallback(() => {
        setValues(initialValues);
        setIsDirty(false);
    }, [initialValues]);

    const saveForm = useCallback(async () => {
        if (itemId) {
            const res = await update(itemId, values);
            setInitialValues(res);
            setIsDirty(false);
            return res;
        } else {
            const res = await create(values);
            setInitialValues(res);
            setIsDirty(false);
            return res;
        }
    }, [itemId, values, update, create]);

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

export default useFormHook;