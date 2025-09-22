// utils/form.js - Utils para formulários e validação

/**
 * Valida campos obrigatórios em um objeto de dados
 * @param {Object} data - Dados a serem validados
 * @param {Array<string>} requiredFields - Campos obrigatórios
 * @returns {Array<string>} Array com erros encontrados
 */
export const validateRequiredFields = (data, requiredFields) => {
    const errors = [];

    requiredFields.forEach(field => {
        const value = data[field];
        if (!value || (typeof value === 'string' && !value.trim())) {
            errors.push(`${field} é obrigatório`);
        }
    });

    return errors;
};

/**
 * Valida se um email tem formato válido
 * @param {string} email - Email a ser validado
 * @returns {boolean} True se válido
 */
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Transforma objeto com valores de string para tipos apropriados
 * @param {Object} data - Dados a serem transformados
 * @param {Object} fieldTypes - Mapeamento de tipos por campo
 * @returns {Object} Dados transformados
 */
export const transformFormData = (data, fieldTypes = {}) => {
    const transformed = { ...data };

    Object.entries(fieldTypes).forEach(([field, type]) => {
        const value = transformed[field];

        if (value === null || value === undefined || value === '') {
            return;
        }

        switch (type) {
            case 'int':
                transformed[field] = parseInt(value) || 0;
                break;
            case 'float':
                transformed[field] = parseFloat(value) || 0;
                break;
            case 'boolean':
                transformed[field] = Boolean(value);
                break;
            case 'array':
                transformed[field] = Array.isArray(value) ? value : [value];
                break;
            default:
                transformed[field] = String(value);
        }
    });

    return transformed;
};

/**
 * Constrói opções para select a partir de array de objetos
 * @param {Array} items - Array de objetos
 * @param {string} valueField - Campo para value
 * @param {string} labelField - Campo para label
 * @returns {Array} Array de opções {value, label}
 */
export const buildSelectOptions = (items = [], valueField = 'id', labelField = 'name') => {
    return items.map(item => ({
        value: String(item[valueField]),
        label: String(item[labelField])
    }));
};

/**
 * Normaliza dados de formulário removendo espaços e convertendo vazios
 * @param {Object} data - Dados do formulário
 * @returns {Object} Dados normalizados
 */
export const normalizeFormData = (data) => {
    const normalized = {};

    Object.entries(data).forEach(([key, value]) => {
        if (typeof value === 'string') {
            const trimmed = value.trim();
            normalized[key] = trimmed === '' ? null : trimmed;
        } else {
            normalized[key] = value;
        }
    });

    return normalized;
};

/**
 * Extrai apenas campos especificados de um objeto
 * @param {Object} data - Objeto fonte
 * @param {Array<string>} fields - Campos a extrair
 * @returns {Object} Objeto com apenas os campos especificados
 */
export const extractFields = (data, fields) => {
    const extracted = {};

    fields.forEach(field => {
        if (data.hasOwnProperty(field)) {
            extracted[field] = data[field];
        }
    });

    return extracted;
};

/**
 * Verifica se dados do formulário mudaram
 * @param {Object} original - Dados originais
 * @param {Object} current - Dados atuais
 * @returns {boolean} True se houve mudança
 */
export const hasFormChanged = (original, current) => {
    const originalKeys = Object.keys(original);
    const currentKeys = Object.keys(current);

    if (originalKeys.length !== currentKeys.length) {
        return true;
    }

    return originalKeys.some(key => original[key] !== current[key]);
};

/**
 * Cria objeto de erros vazio baseado em campos
 * @param {Array<string>} fields - Campos do formulário
 * @returns {Object} Objeto com campos como chaves e valores vazios
 */
export const createEmptyErrors = (fields) => {
    return fields.reduce((errors, field) => {
        errors[field] = '';
        return errors;
    }, {});
};