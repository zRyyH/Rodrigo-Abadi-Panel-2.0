// utils/storage.js - Utils para localStorage e sessionStorage

/**
 * Verifica se storage está disponível
 * @param {string} type - Tipo de storage ('localStorage' ou 'sessionStorage')
 * @returns {boolean} True se disponível
 */
const isStorageAvailable = (type) => {
    if (typeof window === 'undefined') return false;

    try {
        const storage = window[type];
        const test = '__storage_test__';
        storage.setItem(test, test);
        storage.removeItem(test);
        return true;
    } catch {
        return false;
    }
};

/**
 * Salva item no localStorage com serialização JSON
 * @param {string} key - Chave de armazenamento
 * @param {any} value - Valor a ser armazenado
 * @returns {boolean} True se salvou com sucesso
 */
export const setLocalStorage = (key, value) => {
    if (!isStorageAvailable('localStorage')) return false;

    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.warn('Erro ao salvar no localStorage:', error);
        return false;
    }
};

/**
 * Recupera item do localStorage com parsing JSON
 * @param {string} key - Chave de armazenamento
 * @param {any} defaultValue - Valor padrão se não encontrar
 * @returns {any} Valor recuperado ou padrão
 */
export const getLocalStorage = (key, defaultValue = null) => {
    if (!isStorageAvailable('localStorage')) return defaultValue;

    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.warn('Erro ao ler do localStorage:', error);
        return defaultValue;
    }
};

/**
 * Remove item do localStorage
 * @param {string} key - Chave a ser removida
 * @returns {boolean} True se removeu com sucesso
 */
export const removeLocalStorage = (key) => {
    if (!isStorageAvailable('localStorage')) return false;

    try {
        localStorage.removeItem(key);
        return true;
    } catch (error) {
        console.warn('Erro ao remover do localStorage:', error);
        return false;
    }
};

/**
 * Salva item no sessionStorage com serialização JSON
 * @param {string} key - Chave de armazenamento
 * @param {any} value - Valor a ser armazenado
 * @returns {boolean} True se salvou com sucesso
 */
export const setSessionStorage = (key, value) => {
    if (!isStorageAvailable('sessionStorage')) return false;

    try {
        sessionStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.warn('Erro ao salvar no sessionStorage:', error);
        return false;
    }
};

/**
 * Recupera item do sessionStorage com parsing JSON
 * @param {string} key - Chave de armazenamento
 * @param {any} defaultValue - Valor padrão se não encontrar
 * @returns {any} Valor recuperado ou padrão
 */
export const getSessionStorage = (key, defaultValue = null) => {
    if (!isStorageAvailable('sessionStorage')) return defaultValue;

    try {
        const item = sessionStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.warn('Erro ao ler do sessionStorage:', error);
        return defaultValue;
    }
};

/**
 * Remove item do sessionStorage
 * @param {string} key - Chave a ser removida
 * @returns {boolean} True se removeu com sucesso
 */
export const removeSessionStorage = (key) => {
    if (!isStorageAvailable('sessionStorage')) return false;

    try {
        sessionStorage.removeItem(key);
        return true;
    } catch (error) {
        console.warn('Erro ao remover do sessionStorage:', error);
        return false;
    }
};

/**
 * Limpa todo o localStorage
 * @returns {boolean} True se limpou com sucesso
 */
export const clearLocalStorage = () => {
    if (!isStorageAvailable('localStorage')) return false;

    try {
        localStorage.clear();
        return true;
    } catch (error) {
        console.warn('Erro ao limpar localStorage:', error);
        return false;
    }
};

/**
 * Limpa todo o sessionStorage
 * @returns {boolean} True se limpou com sucesso
 */
export const clearSessionStorage = () => {
    if (!isStorageAvailable('sessionStorage')) return false;

    try {
        sessionStorage.clear();
        return true;
    } catch (error) {
        console.warn('Erro ao limpar sessionStorage:', error);
        return false;
    }
};