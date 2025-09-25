"use client";

import { useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCrud } from '@/hooks/useCrud';

export const SelectField = ({
    value,
    onChange,
    disabled,
    placeholder,
    options = [],
    collection,
    optionLabel,
    optionValue = 'id'
}) => {
    const { items, readAll, loading } = useCrud(collection);

    useEffect(() => {
        if (collection && optionLabel) readAll();
    }, [collection, optionLabel]);

    const selectOptions = collection && optionLabel
        ? items.map(item => ({ value: item[optionValue], label: item[optionLabel] }))
        : options;

    return (
        <Select value={value} onValueChange={onChange} disabled={disabled || loading}>
            <SelectTrigger>
                <SelectValue placeholder={loading ? 'Carregando...' : placeholder || "Selecionar item..."} />
            </SelectTrigger>
            <SelectContent>
                {selectOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};