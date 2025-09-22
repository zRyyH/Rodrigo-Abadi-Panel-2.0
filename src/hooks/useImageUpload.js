import { useState, useCallback } from 'react';
import DirectusBaseService from '@/services/base';

const fileService = new DirectusBaseService('files');

export function useImageUpload() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const upload = useCallback(async (file) => {
        if (!file) return null;

        setLoading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fileService.uploadFiles(formData);
            return response.data.data;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const reset = useCallback(() => {
        setError(null);
        setLoading(false);
    }, []);

    return { upload, loading, error, reset };
}

export function useMultipleImageUpload() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [progress, setProgress] = useState(0);

    const upload = useCallback(async (files) => {
        if (!files?.length) return [];

        setLoading(true);
        setError(null);
        setProgress(0);

        try {
            const uploads = [];
            const total = files.length;

            for (let i = 0; i < files.length; i++) {
                const formData = new FormData();
                formData.append('file', files[i]);

                const response = await fileService.uploadFiles(formData);
                uploads.push(response.data.data);

                setProgress(Math.round(((i + 1) / total) * 100));
            }

            return uploads;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
            setProgress(0);
        }
    }, []);

    const uploadParallel = useCallback(async (files, maxConcurrent = 3) => {
        if (!files?.length) return [];

        setLoading(true);
        setError(null);
        setProgress(0);

        try {
            const results = [];
            let completed = 0;

            const uploadFile = async (file) => {
                const formData = new FormData();
                formData.append('file', file);
                const response = await fileService.uploadFiles(formData);
                completed++;
                setProgress(Math.round((completed / files.length) * 100));
                return response.data.data;
            };

            // Upload em lotes para controlar concorrência
            for (let i = 0; i < files.length; i += maxConcurrent) {
                const batch = files.slice(i, i + maxConcurrent);
                const batchPromises = batch.map(uploadFile);
                const batchResults = await Promise.all(batchPromises);
                results.push(...batchResults);
            }

            return results;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
            setProgress(0);
        }
    }, []);

    const reset = useCallback(() => {
        setError(null);
        setLoading(false);
        setProgress(0);
    }, []);

    return { upload, uploadParallel, loading, error, progress, reset };
}