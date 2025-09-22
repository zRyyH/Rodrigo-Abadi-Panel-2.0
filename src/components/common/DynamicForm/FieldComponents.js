"use client";

import React, { useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { X, Upload, FileText } from 'lucide-react';
import { useCrud } from '@/hooks/useCrud';

export const SelectField = ({ field, formField, editable }) => {
    const { items, readAll, loading } = useCrud(field.collection);

    useEffect(() => {
        if (field.collection && field.optionLabel) {
            readAll();
        }
    }, [field.collection, field.optionLabel]);

    // Se tem collection definida, usa os dados do CRUD
    const options = field.collection && field.optionLabel
        ? items.map(item => ({
            value: item[field.optionValue || 'id'],
            label: item[field.optionLabel]
        }))
        : field.options || [];

    return (
        <Select
            disabled={!editable || loading}
            value={formField.value}
            onValueChange={formField.onChange}
        >
            <SelectTrigger>
                <SelectValue
                    placeholder={loading
                        ? 'Carregando...'
                        : field.placeholder || `Selecione ${field.label.toLowerCase()}`
                    }
                />
            </SelectTrigger>
            <SelectContent>
                {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export const FileField = ({ field, formField, editable }) => (
    <div className="space-y-2">
        <div className="flex items-center gap-2">
            <input
                type="file"
                accept={field.accept || '.pdf,.doc,.docx,.jpg,.jpeg,.png'}
                onChange={(e) => formField.onChange(e.target.files?.[0])}
                disabled={!editable}
                className="hidden"
                id={`file-${field.name}`}
            />
            <Button
                type="button"
                variant="outline"
                disabled={!editable}
                onClick={() => document.getElementById(`file-${field.name}`)?.click()}
            >
                <Upload className="h-4 w-4 mr-2" />
                Selecionar arquivo
            </Button>
            {formField.value && (
                <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => formField.onChange(null)}
                >
                    <X className="h-4 w-4" />
                </Button>
            )}
        </div>
        {formField.value && (
            <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
                <FileText className="h-4 w-4" />
                <span className="text-sm text-muted-foreground">
                    {formField.value.name}
                </span>
            </div>
        )}
    </div>
);

export const TextareaField = ({ field, formField, editable }) => (
    <Textarea disabled={!editable} placeholder={field.placeholder} {...formField} />
);

export const CheckboxField = ({ formField, editable }) => (
    <Checkbox disabled={!editable} checked={formField.value} onCheckedChange={formField.onChange} />
);

export const SwitchField = ({ formField, editable }) => (
    <Switch disabled={!editable} checked={formField.value} onCheckedChange={formField.onChange} />
);

export const DefaultField = ({ field, formField, editable }) => (
    <Input
        type={field.type === 'default' ? 'text' : field.type}
        disabled={!editable}
        placeholder={field.placeholder}
        {...formField}
    />
);