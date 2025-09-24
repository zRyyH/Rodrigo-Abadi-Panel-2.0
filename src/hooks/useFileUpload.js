import { useState } from 'react';
import DirectusBaseService from '@/services/base';

const fileService = new DirectusBaseService('files');

export function useFileUpload() {
    const [isUploading, setIsUploading] = useState(false);

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