export const configs = {
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