// fields/index.js
"use client";

// Importar para usar no mapeamento
import { CheckboxField } from './CheckboxField';
import { DefaultField } from './DefaultField';
import { FileField } from './FileField';
import { SelectField } from './SelectField';
import { SwitchField } from './SwitchField';
import { TextareaField } from './TextareaField';

// Exportar todos os componentes de campo
export { CheckboxField } from './CheckboxField';
export { DefaultField } from './DefaultField';
export { FileField } from './FileField';
export { SelectField } from './SelectField';
export { SwitchField } from './SwitchField';
export { TextareaField } from './TextareaField';

// Objeto mapeando tipos para componentes (opcional, para facilitar uso dinâmico)
export const FIELD_COMPONENTS = {
    checkbox: CheckboxField,
    default: DefaultField,
    text: DefaultField,
    email: DefaultField,
    password: DefaultField,
    number: DefaultField,
    file: FileField,
    select: SelectField,
    switch: SwitchField,
    textarea: TextareaField,
};

// Função helper para obter o componente correto baseado no tipo (opcional)
export const getFieldComponent = (type) => {
    return FIELD_COMPONENTS[type] || DefaultField;
};