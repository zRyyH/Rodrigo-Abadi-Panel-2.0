// utils/table.js - Utils para tabelas, filtros e paginação

/**
 * Constrói filtros para API baseado em configuração
 * @param {string} search - Texto de busca
 * @param {Object} filters - Filtros selecionados
 * @param {Object} config - Configuração de filtros
 * @returns {Object} Objeto de filtros formatado
 */
export const buildApiFilters = (search, filters = {}, config = {}) => {
    const apiFilter = {};

    // Filtro de busca
    if (search && config.searchFields?.length) {
        apiFilter._or = config.searchFields.map(field => ({
            [field]: { _icontains: search }
        }));
    }

    // Filtros específicos
    Object.entries(filters).forEach(([key, value]) => {
        if (value && config.filterMap?.[key]) {
            const mapping = config.filterMap[key];
            const transformedValue = mapping.transform
                ? mapping.transform(value)
                : value;

            apiFilter[mapping.field] = {
                [mapping.operator || '_eq']: transformedValue
            };
        }
    });

    return apiFilter;
};

/**
 * Calcula metadados de paginação
 * @param {number} currentPage - Página atual
 * @param {number} totalItems - Total de itens
 * @param {number} itemsPerPage - Itens por página
 * @returns {Object} Metadados de paginação
 */
export const calculatePagination = (currentPage, totalItems, itemsPerPage) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const offset = (currentPage - 1) * itemsPerPage;

    return {
        currentPage,
        totalPages,
        totalItems,
        itemsPerPage,
        offset,
        hasNext: currentPage < totalPages,
        hasPrev: currentPage > 1,
        startItem: offset + 1,
        endItem: Math.min(offset + itemsPerPage, totalItems)
    };
};

/**
 * Gera range de páginas para exibição
 * @param {number} currentPage - Página atual
 * @param {number} totalPages - Total de páginas
 * @param {number} maxVisible - Máximo de páginas visíveis (default: 5)
 * @returns {Array<number>} Array com números das páginas
 */
export const generatePageRange = (currentPage, totalPages, maxVisible = 5) => {
    if (totalPages <= maxVisible) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    let start, end;

    if (currentPage <= Math.ceil(maxVisible / 2)) {
        start = 1;
        end = maxVisible;
    } else if (currentPage >= totalPages - Math.floor(maxVisible / 2)) {
        start = totalPages - maxVisible + 1;
        end = totalPages;
    } else {
        start = currentPage - Math.floor(maxVisible / 2);
        end = currentPage + Math.floor(maxVisible / 2);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

/**
 * Filtra array localmente baseado em texto de busca
 * @param {Array} items - Itens a filtrar
 * @param {string} search - Texto de busca
 * @param {Array<string>} searchFields - Campos a pesquisar
 * @returns {Array} Itens filtrados
 */
export const filterBySearch = (items, search, searchFields) => {
    if (!search || !searchFields?.length) return items;

    const searchLower = search.toLowerCase();

    return items.filter(item =>
        searchFields.some(field => {
            const value = item[field];
            return value && String(value).toLowerCase().includes(searchLower);
        })
    );
};

/**
 * Ordena array por campo específico
 * @param {Array} items - Itens a ordenar
 * @param {string} field - Campo para ordenação
 * @param {string} direction - Direção ('asc' ou 'desc')
 * @returns {Array} Itens ordenados
 */
export const sortByField = (items, field, direction = 'asc') => {
    return [...items].sort((a, b) => {
        const aValue = a[field];
        const bValue = b[field];

        // Tratamento para valores nulos/undefined
        if (aValue == null && bValue == null) return 0;
        if (aValue == null) return direction === 'asc' ? 1 : -1;
        if (bValue == null) return direction === 'asc' ? -1 : 1;

        // Comparação normal
        if (aValue < bValue) return direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return direction === 'asc' ? 1 : -1;
        return 0;
    });
};

/**
 * Aplica paginação local a um array
 * @param {Array} items - Itens a paginar
 * @param {number} currentPage - Página atual
 * @param {number} itemsPerPage - Itens por página
 * @returns {Object} Resultado paginado {data, pagination}
 */
export const paginateArray = (items, currentPage, itemsPerPage) => {
    const totalItems = items.length;
    const pagination = calculatePagination(currentPage, totalItems, itemsPerPage);

    const startIndex = pagination.offset;
    const endIndex = startIndex + itemsPerPage;
    const data = items.slice(startIndex, endIndex);

    return { data, pagination };
};

/**
 * Conta filtros ativos
 * @param {Object} filters - Objeto de filtros
 * @returns {number} Número de filtros ativos
 */
export const countActiveFilters = (filters) => {
    return Object.values(filters).filter(value => {
        if (Array.isArray(value)) {
            return value.length > 0;
        }
        return value !== null && value !== undefined && value !== '';
    }).length;
};