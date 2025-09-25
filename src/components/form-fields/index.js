"use client";

import { CheckboxField } from './CheckboxField';
import { DefaultField } from './DefaultField';
import { FileField } from './FileField';
import { SelectField } from './SelectField';
import { SwitchField } from './SwitchField';
import { TextareaField } from './TextareaField';

export { CheckboxField, DefaultField, FileField, SelectField, SwitchField, TextareaField };

const FIELD_MAP = {
    checkbox: CheckboxField,
    file: FileField,
    select: SelectField,
    switch: SwitchField,
    textarea: TextareaField,
};

export const getFieldComponent = (type) => FIELD_MAP[type] || DefaultField;