import { useState } from 'react';
import DirectusBaseService from '@/services/base';
import { useAsyncRequest } from './useAsyncRequest';

export const useCrud = (collection) => {
    const [item, setItem] = useState(null);
    const [items, setItems] = useState([]);
    const [meta, setMeta] = useState(null);
    const [uploadedFiles, setUploadedFiles] = useState([]);

    const service = new DirectusBaseService(collection);
    const { loading, error, run, clearError } = useAsyncRequest();

    const read = (id, options = {}) =>
        run(async () => {
            const res = await service.readItem(id, options);
            const data = res.data.data;
            setItem(data);
            return data;
        });

    const readAll = (options = {}) =>
        run(async () => {
            const res = await service.readItems(options);
            const data = res.data.data;
            setItems(data);
            setMeta(res.data.meta);
            return { data, meta: res.data.meta };
        });

    const create = (data) =>
        run(async () => {
            const res = await service.createItem(data);
            const newItem = res.data.data;
            setItem(newItem);
            return newItem;
        });

    const update = (id, data) =>
        run(async () => {
            const res = await service.updateItem(id, data);
            const updatedItem = res.data.data;
            setItem(updatedItem);
            return updatedItem;
        });

    const remove = (id) =>
        run(async () => {
            await service.deleteItem(id);
            setItem(null);
            return true;
        });

    const uploadFiles = (formData) =>
        run(async () => {
            const res = await service.uploadFiles(formData);
            const files = res.data.data;
            setUploadedFiles(files);
            return files;
        });

    return {
        item,
        items,
        meta,
        uploadedFiles,
        loading,
        error,
        read,
        readAll,
        create,
        update,
        remove,
        uploadFiles,
        clearError,
    };
};