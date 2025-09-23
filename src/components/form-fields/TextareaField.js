"use client";

import { Textarea } from '@/components/ui/textarea';

export const TextareaField = ({ field, formField, editable }) => (
    <Textarea disabled={!editable} placeholder={field.placeholder} {...formField} />
);