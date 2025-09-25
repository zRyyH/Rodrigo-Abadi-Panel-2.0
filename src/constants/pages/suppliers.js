export const configs = {
    query: {
        fields: ['*'],
        searchFields: ['supplier_name'],
    },

    columns: [
        { key: 'supplier_name', label: 'Fornecedor' },
    ],

    filters: [
        {
            key: 'supplier_name',
            label: 'Fornecedor',
            type: 'select',
            collection: 'supplier',
            valueField: 'id',
            labelField: 'supplier_name',
            placeholder: 'Selecione um fornecedor...',
            distinct: true
        },
    ],

    fields: [
        {
            name: "supplier_name",
            label: "Fornecedor",
            type: "text",
            placeholder: "Digite o nome do fornecedor...",
            required: true,
            editable: true
        }
    ]
};