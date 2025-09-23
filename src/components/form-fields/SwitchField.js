"use client";

import { Switch } from '@/components/ui/switch';

export const SwitchField = ({ formField, editable }) => (
    <Switch disabled={!editable} checked={formField.value} onCheckedChange={formField.onChange} />
);