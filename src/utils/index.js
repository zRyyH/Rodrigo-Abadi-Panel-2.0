// utils/index.js - Exportações centralizadas de todos os utils

// Utils de dados
export {
    formatCurrency,
    formatDate,
    formatDateTime,
    cleanEmptyValues,
    withDefault,
    truncateText,
    getUniqueValues,
    groupBy,
    toInt,
    toFloat
} from './data';

// Utils de formulário
export {
    validateRequiredFields,
    isValidEmail,
    transformFormData,
    buildSelectOptions,
    normalizeFormData,
    extractFields,
    hasFormChanged,
    createEmptyErrors
} from './form';

// Utils de tabela
export {
    buildApiFilters,
    calculatePagination,
    generatePageRange,
    filterBySearch,
    sortByField,
    paginateArray,
    countActiveFilters
} from './table';

// Utils de URL
export {
    buildUrlWithParams,
    getQueryParams,
    updateUrlParams,
    generateSlug,
    buildBreadcrumbs,
    isActiveRoute,
    formatImageUrl
} from './url';

// Utils de storage
export {
    setLocalStorage,
    getLocalStorage,
    removeLocalStorage,
    setSessionStorage,
    getSessionStorage,
    removeSessionStorage,
    clearLocalStorage,
    clearSessionStorage
} from './storage';