export const INVOICES_CONFIG = {
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

export const PACKAGES_CONFIG = {
    query: {
        fields: ['*'],
        searchFields: ['type_of_packaging'],
    },

    columns: [
        { key: 'type_of_packaging', label: 'Embalagem' },
    ],

    filters: [
        {
            key: 'type_of_packaging',
            label: 'Embalagem',
            type: 'select',
            collection: 'packages',
            valueField: 'id',
            labelField: 'type_of_packaging',
            placeholder: 'Selecione uma embalagem...',
            distinct: true
        },
    ],

    fields: [
        {
            name: "type_of_packaging",
            label: "Embalagem",
            type: "text",
            placeholder: "Digite o tipo da embalagem...",
            required: true,
            editable: true
        }
    ]
};

export const SUPPLIERS_CONFIG = {
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

export const ORIGINS_CONFIG = {
    query: {
        fields: ['*'],
        searchFields: ['origin'],
    },

    columns: [
        { key: 'origin', label: 'Origem' },
    ],

    filters: [
        {
            key: 'origin',
            label: 'Origem',
            type: 'select',
            collection: 'origins',
            valueField: 'id',
            labelField: 'origin',
            placeholder: 'Selecione uma origem...',
            distinct: true
        },
    ],

    fields: [
        {
            name: "origin",
            label: "Origem",
            type: "text",
            placeholder: "Digite a origem...",
            required: true,
            editable: true
        }
    ]
};

export const PRODUCTS_CONFIG = {
    query: {
        fields: ['*', 'package_id.*', 'supplier_id.*'],
        searchFields: ['sku', 'name', 'ncm', 'cest'],
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

export const SALES_CONFIG = {
    query: {
        searchFields: ['sku', 'listing_title', 'listing_id', 'buyer_name', 'personal_or_company_data', 'delivery_method', 'sale_id'],
    },

    columns: [
        { key: 'sku', label: 'SKU' },
        { key: 'listing_title', label: 'Nome do produto' },
        { key: 'listing_id', label: 'Anúncio' },
        { key: 'buyer_name', label: 'Nome do comprador' },
        { key: 'personal_or_company_data', label: 'Apelido do comprador' },
        { key: 'sale_date', label: 'Data' },
        { key: 'delivery_method', label: 'Tipo de envio' },
        { key: 'sale_id', label: 'Numero da venda' },
    ],

    filters: [
        {
            key: 'delivery_method',
            label: 'Tipo de envio',
            type: 'select',
            collection: 'sales',
            valueField: 'id',
            labelField: 'delivery_method',
            placeholder: 'Selecione um tipo de envio...',
            distinct: true
        }
    ]
};

export const NFES_CONFIG = {
    query: {
        searchFields: ['*'],
    },

    columns: [
        { key: 'invoice_number', label: 'Numero da nota' },
        { key: 'sale_or_dispatch', label: 'Numero da venda' },
        { key: 'issue_date', label: 'Data' },
        { key: 'status', label: 'Status' },
        { key: 'sale_date', label: 'Data' },
        { key: 'total_amount', label: 'Valor Total' },
    ],

    filters: [
        {
            key: 'status',
            label: 'Status',
            type: 'select',
            collection: 'nfes',
            valueField: 'id',
            labelField: 'status',
            placeholder: 'Selecione um status...',
            distinct: true
        }
    ]
};