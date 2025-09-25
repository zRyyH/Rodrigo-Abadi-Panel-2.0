"use client";

import { Checkbox } from '@/components/ui/checkbox';

export const CheckboxField = ({ value, onChange, disabled }) => (
    <Checkbox
        checked={value}
        onCheckedChange={onChange}
        disabled={disabled}
    />
);