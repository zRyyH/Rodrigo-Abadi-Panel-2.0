export const configs = {
    query: {
        fields: ['*', 'origin_id.origin', 'ncm', 'cest', 'quantity', 'product_name'],
        searchFields: ['product_name', 'ncm', 'cest'],
    },

    columns: [
        { key: 'product_name', label: 'Produto' },
        { key: 'quantity', label: 'Quantidade' },
        { key: 'ncm', label: 'NCM' },
        { key: 'cest', label: 'CEST' },
        { key: 'origin', label: 'Origem' }
    ],

    filters: [
        {
            key: 'origin_id',
            label: 'Origem',
            type: 'select',
            collection: 'origins',
            valueField: 'id',
            labelField: 'origin',
            placeholder: 'Selecione uma origem...',
        },
    ],

    fields: [
        {
            name: "product_name",
            label: "Nome do produto",
            type: "text",
            placeholder: "Digite o nome do produto...",
            required: true,
            editable: true
        },
        {
            name: "quantity",
            label: "Quantidade",
            type: "text",
            placeholder: "Digite a quantidade...",
            required: true,
            editable: true
        },
        {
            name: 'origin_id',
            label: 'Origem',
            type: 'select',
            collection: 'origins',
            optionLabel: 'origin',
            optionValue: 'id',
            required: true
        },
        {
            name: "ncm",
            label: "NCM",
            type: "number",
            placeholder: "Digite o NCM...",
            required: true,
            editable: true
        },
        {
            name: "cest",
            label: "CEST",
            type: "number",
            placeholder: "Digite o CEST...",
            required: true,
            editable: true
        },
    ]
};