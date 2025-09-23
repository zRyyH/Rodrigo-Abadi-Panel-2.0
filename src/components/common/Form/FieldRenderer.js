"use client";

import React from 'react';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { getFieldComponent } from './fieldTypes';

export const FieldRenderer = ({ field, control }) => {
    const Component = getFieldComponent(field.type);
    const editable = field.editable !== false;

    return (
        <FormField
            key={field.name}
            control={control}
            name={field.name}
            rules={{ required: field.required ? `${field.label} é obrigatório` : false }}
            render={({ field: formField }) => (
                <FormItem>
                    <FormLabel>{field.label}</FormLabel>
                    <FormControl>
                        <Component field={field} formField={formField} editable={editable} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};