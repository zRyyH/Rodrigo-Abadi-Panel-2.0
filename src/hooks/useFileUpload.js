import { useState, useEffect } from 'react';
import { useFileApi } from './useFileApi';

export function useFileUpload(junctionCollection, relationCollum, itemId, options = {}) {
    const [files, setFiles] = useState([]);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [isUploading, setIsUploading] = useState(false);

    const { loadExistingFiles, uploadFiles, removeRelation, createRelation } = useFileApi(junctionCollection);

    // Carregar arquivos existentes
    useEffect(() => {
        const fetchFiles = async () => {
            if (itemId && junctionCollection) {
                const existing = await loadExistingFiles(itemId, options);
                setFiles(existing);
            }
        };

        fetchFiles();
    }, [itemId, junctionCollection]);

    // Upload automático quando `files` muda
    useEffect(() => {
        const handleUpload = async () => {
            if (files.filter(item => item.file).length > 0) {
                setIsUploading(true);
                try {
                    const response = await uploadFiles(files);
                    setUploadedFiles(prev => [...prev, ...response])
                } finally {
                    setIsUploading(false);
                }
            }
        };

        handleUpload();
    }, [files]);

    const create = async (itemId, relationCollum) => {
        const payload = uploadedFiles.map(file => {
            return {
                directus_files_id: file.directus_files_id,
                [relationCollum]: itemId
            }
        })

        return await createRelation(payload)
    };

    // const remove = async () => {
    //     return await removeRelation(itemId, relationCollum)
    // };

    return {
        files,
        setFiles,
        isUploading,
        uploadedFiles,
        remove: removeRelation,
        create
    };
}
