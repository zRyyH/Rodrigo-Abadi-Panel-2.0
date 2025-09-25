export const configs = {
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