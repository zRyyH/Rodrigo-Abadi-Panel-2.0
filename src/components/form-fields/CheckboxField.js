"use client";

import { Checkbox } from '@/components/ui/checkbox';

export const CheckboxField = ({ formField, editable }) => (
    <Checkbox disabled={!editable} checked={formField.value} onCheckedChange={formField.onChange} />
);