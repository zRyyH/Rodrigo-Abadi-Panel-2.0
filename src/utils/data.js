// utils/data.js - Utils para transformação e manipulação de dados

/**
 * Formata valor monetário para formato brasileiro
 * @param {number|string} value - Valor a ser formatado
 * @returns {string} Valor formatado (ex: "R$ 1.234,56")
 */
export const formatCurrency = (value) => {
    const numValue = Number(value || 0);
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(numValue);
};

/**
 * Formata data para formato brasileiro
 * @param {string|Date} date - Data a ser formatada
 * @param {Object} options - Opções de formatação
 * @returns {string} Data formatada
 */
export const formatDate = (date, options = {}) => {
    if (!date) return 'N/A';

    const defaultOptions = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    };

    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('pt-BR', { ...defaultOptions, ...options });
};

/**
 * Formata data e hora para formato brasileiro
 * @param {string|Date} datetime - Data/hora a ser formatada
 * @returns {string} Data/hora formatada
 */
export const formatDateTime = (datetime) => {
    return formatDate(datetime, {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

/**
 * Remove propriedades vazias de um objeto
 * @param {Object} obj - Objeto a ser limpo
 * @returns {Object} Objeto sem propriedades vazias
 */
export const cleanEmptyValues = (obj) => {
    return Object.fromEntries(
        Object.entries(obj).filter(([_, value]) =>
            value !== null &&
            value !== undefined &&
            value !== '' &&
            !(Array.isArray(value) && value.length === 0)
        )
    );
};

/**
 * Aplica valor padrão se o valor for vazio
 * @param {any} value - Valor a ser verificado
 * @param {any} defaultValue - Valor padrão (default: 'N/A')
 * @returns {any} Valor original ou padrão
 */
export const withDefault = (value, defaultValue = 'N/A') => {
    return value || defaultValue;
};

/**
 * Trunca texto se exceder o limite
 * @param {string} text - Texto a ser truncado
 * @param {number} maxLength - Tamanho máximo (default: 50)
 * @returns {string} Texto truncado
 */
export const truncateText = (text, maxLength = 50) => {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
};

/**
 * Extrai valores únicos de um array de objetos
 * @param {Array} array - Array de objetos
 * @param {string} field - Campo a extrair valores únicos
 * @returns {Array} Array com valores únicos
 */
export const getUniqueValues = (array, field) => {
    return [...new Set(array
        .map(item => item[field])
        .filter(Boolean)
    )].sort();
};

/**
 * Agrupa array de objetos por campo específico
 * @param {Array} array - Array a ser agrupado
 * @param {string} field - Campo para agrupar
 * @returns {Object} Objeto agrupado
 */
export const groupBy = (array, field) => {
    return array.reduce((groups, item) => {
        const key = item[field];
        if (!groups[key]) {
            groups[key] = [];
        }
        groups[key].push(item);
        return groups;
    }, {});
};

/**
 * Converte string para número inteiro, com fallback
 * @param {any} value - Valor a ser convertido
 * @param {number} fallback - Valor fallback (default: 0)
 * @returns {number} Número inteiro
 */
export const toInt = (value, fallback = 0) => {
    const parsed = parseInt(value);
    return isNaN(parsed) ? fallback : parsed;
};

/**
 * Converte string para número decimal, com fallback
 * @param {any} value - Valor a ser convertido
 * @param {number} fallback - Valor fallback (default: 0)
 * @returns {number} Número decimal
 */
export const toFloat = (value, fallback = 0) => {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? fallback : parsed;
};