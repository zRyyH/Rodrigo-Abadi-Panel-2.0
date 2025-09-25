import { useState } from 'react';
import ApiBaseService from '@/services/api';
import { useAsyncRequest } from './useAsyncRequest';

export const useCrud = (endpoint) => {
    const [uploadedFiles, setUploadedFiles] = useState({});
    const { loading, error, run, clearError } = useAsyncRequest();

    const apiService = new ApiBaseService(endpoint);

    const uploadFiles = (formData) =>
        run(async () => {
            const res = await apiService.uploadFiles(formData);
            setUploadedFiles(res);
            return res;
        });

    return {
        uploadedFiles,
        loading,
        error,
        uploadFiles,
        clearError,
    };
};