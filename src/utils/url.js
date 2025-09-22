// utils/url.js - Utils para URLs e navegação

/**
 * Constrói URL com query parameters
 * @param {string} basePath - Caminho base
 * @param {Object} params - Parâmetros de query
 * @returns {string} URL completa
 */
export const buildUrlWithParams = (basePath, params = {}) => {
    const url = new URL(basePath, window.location.origin);

    Object.entries(params).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== '') {
            if (Array.isArray(value)) {
                value.forEach(v => url.searchParams.append(key, String(v)));
            } else {
                url.searchParams.set(key, String(value));
            }
        }
    });

    return url.pathname + url.search;
};

/**
 * Extrai parâmetros de query da URL atual
 * @returns {Object} Objeto com parâmetros de query
 */
export const getQueryParams = () => {
    if (typeof window === 'undefined') return {};

    const params = {};
    const searchParams = new URLSearchParams(window.location.search);

    for (const [key, value] of searchParams) {
        if (params[key]) {
            // Se já existe, converte para array
            if (Array.isArray(params[key])) {
                params[key].push(value);
            } else {
                params[key] = [params[key], value];
            }
        } else {
            params[key] = value;
        }
    }

    return params;
};

/**
 * Atualiza URL atual com novos parâmetros sem recarregar a página
 * @param {Object} newParams - Novos parâmetros
 * @param {boolean} replace - Se deve substituir na história (default: false)
 */
export const updateUrlParams = (newParams, replace = false) => {
    if (typeof window === 'undefined') return;

    const currentParams = getQueryParams();
    const updatedParams = { ...currentParams, ...newParams };

    // Remove parâmetros com valores vazios
    Object.keys(updatedParams).forEach(key => {
        const value = updatedParams[key];
        if (value === null || value === undefined || value === '' ||
            (Array.isArray(value) && value.length === 0)) {
            delete updatedParams[key];
        }
    });

    const newUrl = buildUrlWithParams(window.location.pathname, updatedParams);

    if (replace) {
        window.history.replaceState({}, '', newUrl);
    } else {
        window.history.pushState({}, '', newUrl);
    }
};

/**
 * Gera slug amigável a partir de texto
 * @param {string} text - Texto a converter
 * @returns {string} Slug gerado
 */
export const generateSlug = (text) => {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')           // Substitui espaços por hífens
        .replace(/[^\w\-]+/g, '')       // Remove caracteres especiais
        .replace(/\-\-+/g, '-')         // Substitui múltiplos hífens por um
        .replace(/^-+/, '')             // Remove hífens do início
        .replace(/-+$/, '');            // Remove hífens do fim
};

/**
 * Constrói breadcrumbs baseado no caminho atual
 * @param {string} pathname - Caminho atual
 * @param {Object} routeLabels - Mapeamento de rotas para labels
 * @returns {Array} Array de breadcrumbs {label, href}
 */
export const buildBreadcrumbs = (pathname, routeLabels = {}) => {
    const segments = pathname.split('/').filter(Boolean);
    const breadcrumbs = [];

    let currentPath = '';

    segments.forEach((segment, index) => {
        currentPath += `/${segment}`;

        const label = routeLabels[currentPath] ||
            routeLabels[segment] ||
            segment.charAt(0).toUpperCase() + segment.slice(1);

        breadcrumbs.push({
            label,
            href: currentPath,
            isLast: index === segments.length - 1
        });
    });

    return breadcrumbs;
};

/**
 * Verifica se uma rota está ativa
 * @param {string} currentPath - Caminho atual
 * @param {string} routePath - Caminho da rota
 * @param {boolean} exact - Se deve ser comparação exata (default: false)
 * @returns {boolean} True se a rota está ativa
 */
export const isActiveRoute = (currentPath, routePath, exact = false) => {
    if (exact) {
        return currentPath === routePath;
    }

    return currentPath.startsWith(routePath);
};

/**
 * Formata URL para imagem do Directus
 * @param {string} fileId - ID do arquivo
 * @param {string} baseUrl - URL base do Directus
 * @returns {string} URL completa da imagem
 */
export const formatImageUrl = (fileId, baseUrl) => {
    if (!fileId || !baseUrl) return '';
    return `${baseUrl}/assets/${fileId}`;
};