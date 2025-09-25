export const configs = {
    query: {
        fields: ['*', 'package_id.*', 'supplier_id.*', 'gallery.*'],
        searchFields: ['sku', 'name', 'ncm', 'cest'],
    },

    queryId: {
        fields: ['sku', 'name', 'package_id', 'supplier_id', 'quantity', 'purchase_cost', 'ncm', 'cest'],
    },

    columns: [
        { key: 'sku', label: 'SKU' },
        { key: 'name', label: 'Nome' },
        { key: 'quantity', label: 'Quantidade' },
        { key: 'package_id', label: 'Embalagem' },
        { key: 'supplier_id', label: 'Fornecedor' },
        { key: 'purchase_cost', label: 'Custo' },
        { key: 'ncm', label: 'NCM' },
        { key: 'cest', label: 'CEST' },
    ],

    filters: [
        {
            key: 'package_id',
            label: 'Embalagem',
            type: 'select',
            collection: 'packages',
            valueField: 'id',
            labelField: 'type_of_packaging',
            placeholder: 'Selecione uma embalagem...'
        },
        {
            key: 'supplier_id',
            label: 'Fornecedor',
            type: 'select',
            collection: 'supplier',
            valueField: 'id',
            labelField: 'supplier_name',
            placeholder: 'Selecione um fornecedor...'
        },
    ],

    fields: [
        {
            name: "name",
            label: "Nome do produto",
            type: "text",
            placeholder: "Digite o nome do produto...",
            required: true,
            editable: true
        },
        {
            name: "sku",
            label: "SKU",
            type: "text",
            placeholder: "Digite o SKU...",
            required: true,
            editable: true
        },
        {
            name: "quantity",
            label: "Quantidade",
            type: "number",
            placeholder: "Digite a quantidade...",
            required: true,
            editable: true
        },
        {
            name: "purchase_cost",
            label: "Custo",
            type: "number",
            placeholder: "Digite a quantidade...",
            required: true,
            editable: true
        },
        {
            name: 'package_id',
            label: 'Embalagens',
            type: 'select',
            collection: 'packages',
            optionLabel: 'type_of_packaging',
            optionValue: 'id',
            required: true
        },
        {
            name: 'supplier_id',
            label: 'Fornecedores',
            type: 'select',
            collection: 'supplier',
            optionLabel: 'supplier_name',
            optionValue: 'id',
            required: true
        },
        {
            name: "cest",
            label: "CEST",
            type: "number",
            placeholder: "Digite o CEST...",
            required: true,
            editable: true
        },
        {
            name: "ncm",
            label: "NCM",
            type: "number",
            placeholder: "Digite o NCM...",
            required: true,
            editable: true
        },
    ]
};