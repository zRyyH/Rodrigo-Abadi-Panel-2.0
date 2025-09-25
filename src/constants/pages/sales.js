export const configs = {
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
    ],
};