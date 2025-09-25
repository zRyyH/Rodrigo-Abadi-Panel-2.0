"use client";

import { Input } from '@/components/ui/input';

export const DefaultField = ({ type = 'text', value, onChange, disabled, placeholder }) => (
    <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder={placeholder}
    />
);