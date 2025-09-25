"use client";

import { Textarea } from '@/components/ui/textarea';

export const TextareaField = ({ value, onChange, disabled, placeholder }) => (
    <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder={placeholder}
    />
);