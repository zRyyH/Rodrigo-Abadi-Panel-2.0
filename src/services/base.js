import { httpClient } from '@/libs/http-client';

class DirectusBaseService {
    constructor(collection) {
        this.collection = collection;
    }

    async readItem(id, options = {}) {
        try {
            const params = this._buildParams(options);
            return await httpClient.get(`items/${this.collection}/${id}`, { params });
        } catch (error) {
            throw new Error(`Erro ao buscar item: ${error.message}`);
        }
    }

    async readItems(options = {}) {
        try {
            const params = this._buildParams(options);
            params.meta = 'total_count,filter_count'
            return await httpClient.get(`items/${this.collection}`, { params });
        } catch (error) {
            throw new Error(`Erro ao buscar itens: ${error.message}`);
        }
    }

    async createItem(data) {
        try {
            return await httpClient.post(`items/${this.collection}`, data);
        } catch (error) {
            throw new Error(`Erro ao criar item: ${error.message}`);
        }
    }

    async updateItem(id, data) {
        try {
            return await httpClient.patch(`items/${this.collection}/${id}`, data);
        } catch (error) {
            throw new Error(`Erro ao atualizar item: ${error.message}`);
        }
    }

    async deleteItem(id) {
        try {
            await httpClient.delete(`items/${this.collection}/${id}`);
            return true;
        } catch (error) {
            throw new Error(`Erro ao deletar item: ${error.message}`);
        }
    }

    async uploadFiles(formData) {
        try {
            return await httpClient.post('files', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
        } catch (error) {
            throw new Error(`Erro ao fazer upload: ${error.message}`);
        }
    }

    _buildParams(options) {
        const params = {};

        if (options.fields) params.fields = options.fields.join(',');
        if (options.filter) params.filter = JSON.stringify(options.filter);
        if (options.sort) params.sort = options.sort.join(',');
        if (options.limit) params.limit = options.limit;
        if (options.offset) params.offset = options.offset;
        if (options.groupBy) params.groupBy = options.groupBy;
        if (options.aggregate) params.aggregate = options.aggregate;
        if (options.page) params.page = options.page;
        if (options.search) params.search = options.search;

        return params;
    }
}

export default DirectusBaseService;