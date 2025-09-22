import React from 'react';
import { useForm } from 'react-hook-form';

export const useDynamicForm = (defaultValues = {}, onChange) => {
    const form = useForm({ defaultValues });

    React.useEffect(() => {
        if (!onChange) return;
        const subscription = form.watch(onChange);
        return () => subscription.unsubscribe();
    }, [form, onChange]);

    return form;
};