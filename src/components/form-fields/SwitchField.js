"use client";

import { Switch } from '@/components/ui/switch';

export const SwitchField = ({ value, onChange, disabled }) => (
    <Switch
        checked={value}
        onCheckedChange={onChange}
        disabled={disabled}
    />
);