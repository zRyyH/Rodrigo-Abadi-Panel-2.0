import { useState } from 'react';
import ApiBaseService from '@/services/api';
import { useAsyncRequest } from './useAsyncRequest';

export const useCrudApi = (endpoint) => {
    const [item, setItem] = useState(null);
    const [uploadedFiles, setUploadedFiles] = useState({});
    const { loading, error, run, clearError } = useAsyncRequest();

    const apiService = new ApiBaseService(endpoint);

    const read = (params = {}) =>
        run(async () => {
            const res = await apiService.readItem(params);
            setItem(res);
            return res;
        });

    const uploadFiles = (formData) =>
        run(async () => {
            const res = await apiService.uploadFiles(formData);
            setUploadedFiles(res);
            return res;
        });

    return {
        item,
        uploadedFiles,
        loading,
        error,
        read,
        uploadFiles,
        clearError,
    };
};