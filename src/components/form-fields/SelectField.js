"use client";

import { useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCrud } from '@/hooks/useCrud';

export const SelectField = ({ field, formField, editable }) => {
    const { items, readAll, loading } = useCrud(field.collection);

    useEffect(() => {
        if (field.collection && field.optionLabel) {
            readAll();
        }
    }, [field.collection, field.optionLabel]);

    const options = field.collection && field.optionLabel
        ? items.map(item => ({
            value: item[field.optionValue || 'id'],
            label: item[field.optionLabel]
        }))
        : field.options || [];

    return (
        <Select
            disabled={!editable || loading}
            value={formField.value}
            onValueChange={formField.onChange}
        >
            <SelectTrigger>
                <SelectValue
                    placeholder={loading
                        ? 'Carregando...'
                        : field.placeholder || `Selecione ${field.label.toLowerCase()}`
                    }
                />
            </SelectTrigger>
            <SelectContent>
                {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};