export const configs = {
    fields: [
        {
            name: 'fileSales',
            type: 'file',
            label: 'Arquivo de Vendas',
            required: true,
            accept: '.xlsx',
            editable: true
        },
        {
            name: 'fileInvoices',
            type: 'file',
            label: 'Arquivo de Notas Fiscais',
            required: true,
            accept: '.xlsx',
            editable: true
        }
    ]
};