import { useCrud } from './useCrud';
import { buildFileObj, normalizeResponse } from '@/utils/fileUtils';

export function useFileApi(junctionCollection) {
    const fileCrud = useCrud('directus_files');
    const junctionCrud = useCrud(junctionCollection);

    // Carregar arquivos existentes
    const loadExistingFiles = async (itemId, options = {}) => {
        try {
            const response = await junctionCrud.readAll({
                filter: { products_id: itemId },
                ...options,
            });

            return (
                response.data?.map((item) =>
                    buildFileObj(item?.directus_files_id)
                ) || []
            );

        } catch (error) {
            console.error('Erro ao carregar arquivos existentes:', error);
            return [];
        }
    };

    // Upload de novos arquivos
    const uploadFiles = async (newFiles) => {
        try {
            const formData = new FormData();

            newFiles.forEach((file) => {
                formData.append('file', file.file);
            });

            const response = await fileCrud.uploadFiles(formData);
            const uploaded = normalizeResponse(response);

            return uploaded.map((file) => buildFileObj(file?.id));
        } catch (error) {
            console.error('Erro no upload:', error);
            throw error;
        }
    };

    // Remoção de arquivo
    const removeRelation = async (fileId) => {
        try {
            return await junctionCrud.removeBatch({
                filter: {
                    directus_files_id: {
                        _eq: fileId
                    }
                }
            });
        } catch (error) {
            console.error('Erro ao remover relacao:', error);
        }
    };

    // Criar relacao arquivo item
    const createRelation = async (data) => {
        try {
            return await junctionCrud.create(data);
        } catch (error) {
            console.error('Erro ao criar relacao:', error);
        }
    };

    return { loadExistingFiles, uploadFiles, removeRelation, createRelation };
}
