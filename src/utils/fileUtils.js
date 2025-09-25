export const buildFileObj = (id) => ({
    id: crypto.randomUUID(),
    directus_files_id: id,
    url: `https://manager.awpsoft.com.br/assets/${id}`,
});

export const normalizeResponse = (response) =>
    Array.isArray(response) ? response : [response];
