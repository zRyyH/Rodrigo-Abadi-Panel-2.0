"use client";

import { getFieldComponent } from '@/components/form-fields';

const DynamicForm = ({ fields = [], values = {}, className = '', onFieldChange }) => {
    return (
        <div className={`space-y-4 ${className}`}>
            {fields.map(field => {
                const Component = getFieldComponent(field.type);
                const value = values[field.name] || '';

                return (
                    <div key={field.name} className="space-y-2">
                        {field.label && (
                            <label className="text-sm font-medium">
                                {field.label}
                                {field.required && <span className="text-red-500 ml-1">*</span>}
                            </label>
                        )}
                        <Component
                            field={field}
                            formField={{
                                value,
                                onChange: (e) => onFieldChange?.(field.name, e.target?.value ?? e)
                            }}
                            editable={field.editable !== false}
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default DynamicForm;