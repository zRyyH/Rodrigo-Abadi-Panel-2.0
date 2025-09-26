export const configs = {
    query: {
        searchFields: ['sku', 'listing_title', 'listing_id', 'buyer_name', 'personal_or_company_data', 'delivery_method', 'sale_id'],
    },

    columns: [
        { key: 'sale_id', label: 'Numero da venda' },
        { key: 'sku', label: 'SKU' },
        { key: 'listing_title', label: 'Nome do produto' },
        { key: 'buyer_name', label: 'Nome do comprador' },
        { key: 'listing_id', label: 'Anúncio' },
        { key: 'sale_date', label: 'Data' },
        { key: 'delivery_method', label: 'Tipo de envio' },
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