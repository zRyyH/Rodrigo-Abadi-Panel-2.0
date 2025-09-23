"use client";

import {
    FileField,
    SelectField,
    TextareaField,
    CheckboxField,
    SwitchField,
    DefaultField
} from './FieldComponents';

export const fieldComponents = {
    file: FileField,
    select: SelectField,
    textarea: TextareaField,
    checkbox: CheckboxField,
    switch: SwitchField,
    default: DefaultField
};

export const getFieldComponent = (type) => {
    return fieldComponents[type] || fieldComponents.default;
};