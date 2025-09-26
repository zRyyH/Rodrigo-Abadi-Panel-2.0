export const configs = {
    query: {
        searchFields: ['sale_or_dispatch', 'invoice_number', 'status'],
    },

    columns: [
        { key: 'sale_or_dispatch', label: 'Numero da venda' },
        { key: 'invoice_number', label: 'Numero da nota' },
        { key: 'total_amount', label: 'Valor Total' },
        { key: 'issue_date', label: 'Data' },
        { key: 'status', label: 'Status' },
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