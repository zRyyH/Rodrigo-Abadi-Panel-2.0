import { useState } from 'react';
import { useNotification } from '@/hooks/useNotification';
import DirectusBaseService from '@/services/base';

const fileService = new DirectusBaseService('files');

export function useFileUpload() {
    const [isUploading, setIsUploading] = useState(false);
    const { showError } = useNotification();

    const uploadFiles = async (filesInput) => {
        if (!filesInput) {
            return null;
        }

        const filesArray = Array.isArray(filesInput) ? filesInput : [filesInput];
        setIsUploading(true);

        try {
            const formData = new FormData();
            filesArray.forEach(file => {
                formData.append('file', file);
            });

            const response = await fileService.uploadFiles(formData);
            const uploadedFiles = response.data.data;

            const isMultipleFiles = Array.isArray(filesInput);
            return isMultipleFiles ? uploadedFiles : uploadedFiles[0];

        } catch (error) {
            showError(
                'Erro no upload',
                'Não foi possível enviar o(s) arquivo(s). Tente novamente.'
            );
            throw error;
        } finally {
            setIsUploading(false);
        }
    };

    return {
        uploadFiles,
        isUploading
    };
}