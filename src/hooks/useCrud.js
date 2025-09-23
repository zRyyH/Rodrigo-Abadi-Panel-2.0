import { useState } from 'react';
import { useNotification } from '@/hooks/useNotification';
import DirectusBaseService from '@/services/base';

export const useCrud = (collection) => {
    const [state, setState] = useState({
        item: null,
        items: [],
        meta: null,
        loading: false,
        error: null
    });

    const { showError } = useNotification();
    const service = new DirectusBaseService(collection);

    const executeRequest = async (requestFn, operation = 'Operação') => {
        setState(prev => ({ ...prev, loading: true, error: null }));

        try {
            const result = await requestFn();
            setState(prev => ({ ...prev, loading: false }));
            return result;
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message;

            setState(prev => ({
                ...prev,
                loading: false,
                error: errorMessage
            }));

            showError(`Erro na ${operation}`, errorMessage);
            throw err;
        }
    };

    const api = {
        read: (id, options = {}) => executeRequest(async () => {
            const response = await service.readItem(id, options);
            const data = response.data.data;
            setState(prev => ({ ...prev, item: data }));
            return data;
        }, 'consulta'),

        readAll: (options = {}) => executeRequest(async () => {
            const response = await service.readItems(options);
            const data = response.data.data;
            const meta = response.data.meta;
            setState(prev => ({ ...prev, items: data, meta }));
            return { data, meta };
        }, 'listagem'),

        create: (data) => executeRequest(async () => {
            const response = await service.createItem(data);
            const newItem = response.data.data;
            setState(prev => ({ ...prev, item: newItem }));
            return newItem;
        }, 'criação'),

        update: (id, data) => executeRequest(async () => {
            const response = await service.updateItem(id, data);
            const updatedItem = response.data.data;
            setState(prev => ({ ...prev, item: updatedItem }));
            return updatedItem;
        }, 'atualização'),

        remove: (id) => executeRequest(async () => {
            await service.deleteItem(id);
            setState(prev => ({ ...prev, item: null }));
            return true;
        }, 'exclusão'),

        clearError: () => setState(prev => ({ ...prev, error: null }))
    };

    return { ...state, ...api };
};