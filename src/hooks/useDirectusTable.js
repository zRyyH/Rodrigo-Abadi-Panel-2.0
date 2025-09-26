import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { DirectusBaseService } from '../services/base.js';

const useDirectusTable = (collection, config = {}) => {
    const {
        searchFields = [],
        initialFilters = {},
        sort = [],
        limit = 25,
        ...initialOptions
    } = config;

    const [data, setData] = useState([]);
    const [meta, setMeta] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState(initialFilters);
    const [page, setPage] = useState(1);

    // Service estÃ¡vel
    const service = useMemo(() => new DirectusBaseService(collection), [collection]);

    // Ref para evitar dependÃªncias desnecessÃ¡rias
    const configRef = useRef({ searchFields, initialOptions, sort, limit });
    configRef.current = { searchFields, initialOptions, sort, limit };

    const fetchData = useCallback(async () => {
        if (!collection) return;

        setLoading(true);
        setError(null);

        try {
            const { searchFields, initialOptions, sort, limit } = configRef.current;
            const filterParts = [];

            // Adicionar filtros base
            if (Object.keys(filters).length > 0) {
                filterParts.push(filters);
            }

            // Adicionar filtro de search
            if (search && searchFields.length > 0) {
                const searchFilter = {
                    _or: searchFields.map(field => ({
                        [field]: { _icontains: search }
                    }))
                };
                filterParts.push(searchFilter);
            }

            // Combinar filtros
            let finalFilter = undefined;
            if (filterParts.length === 1) {
                finalFilter = filterParts[0];
            } else if (filterParts.length > 1) {
                finalFilter = { _and: filterParts };
            }

            const options = {
                ...initialOptions,
                limit,
                page
            };

            if (finalFilter) {
                options.filter = finalFilter;
            }

            if (sort.length > 0) {
                options.sort = sort;
            }

            const result = await service.readItems(options);
            
            setData(result.data.data || result);
            setMeta(result.data.meta || null);
        } catch (err) {
            setError(err.message);
            setData([]);
            setMeta(null);
        } finally {
            setLoading(false);
        }
    }, [collection, service, search, filters, page]);

    const handleSearch = useCallback((term) => {
        setSearch(term);
        setPage(1);
    }, []);

    const handleFilter = useCallback((newFilters) => {
        setFilters(prev => ({ ...prev, ...newFilters }));
        setPage(1);
    }, []);

    const clearFilters = useCallback(() => {
        setFilters({});
        setSearch('');
        setPage(1);
    }, []);

    const handlePage = useCallback((newPage) => {
        setPage(newPage);
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return {
        // Data
        data,
        meta,
        loading,
        error,

        // State
        search,
        filters,
        page,

        // Actions
        setSearch: handleSearch,
        setFilters: handleFilter,
        clearFilters,
        setPage: handlePage,
        refetch: fetchData
    };
};

export default useDirectusTable;