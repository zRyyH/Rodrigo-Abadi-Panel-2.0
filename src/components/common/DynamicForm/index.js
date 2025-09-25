"use client";

import { getFieldComponent } from '@/components/form-fields';

const DynamicForm = ({ fields = [], values = {}, onChange, className = '' }) => (
    <div className={`space-y-4 ${className}`}>
        {fields.map(({ name, label, required, editable = true, type = 'text', ...fieldProps }) => {
            const Component = getFieldComponent(type);
            const value = values[name] ?? (type === 'file' ? null : '');

            return (
                <div key={name} className="space-y-2">
                    {label && (
                        <label className="text-sm font-medium">
                            {label}
                            {required && <span className="text-red-500 ml-1">*</span>}
                        </label>
                    )}
                    <Component
                        {...fieldProps}
                        name={name}
                        type={type}
                        value={value}
                        onChange={(value) => onChange?.(name, value)}
                        disabled={!editable}
                    />
                </div>
            );
        })}
    </div>
);

export default DynamicForm;