"use client";

import React from 'react';
import { Form } from '@/components/ui/form';
import { FieldRenderer } from './FieldRenderer';
import { useDynamicForm } from './useDynamicForm';

const DynamicForm = ({ fields = [], defaultValues = {}, className = '', onChange }) => {
    const form = useDynamicForm(defaultValues, onChange);

    return (
        <Form {...form}>
            <div className={`space-y-4 ${className}`}>
                {fields.map((field) => (
                    <FieldRenderer key={field.name} field={field} control={form.control} />
                ))}
            </div>
        </Form>
    );
};

export default DynamicForm;