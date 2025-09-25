import { httpClientApi } from '@/libs/http-client';

class ApiBaseService {
    constructor(collection) {
        this.collection = collection;
    }

    async uploadFiles(formData) {
        try {
            return await httpClientApi.post('upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
        } catch (error) {
            throw new Error(`Erro ao fazer upload: ${error.message}`);
        }
    }
}

export default ApiBaseService;