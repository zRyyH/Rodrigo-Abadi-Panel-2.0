"use client";

import { Input } from '@/components/ui/input';

export const DefaultField = ({ field, formField, editable }) => (
    <Input
        type={field.type === 'default' ? 'text' : field.type}
        disabled={!editable}
        placeholder={field.placeholder}
        {...formField}
    />
);