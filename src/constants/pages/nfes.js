export const configs = {
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