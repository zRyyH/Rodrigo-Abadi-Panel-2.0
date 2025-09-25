export const formatCurrency = (value) =>
    `R$ ${parseFloat(value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;

export const formatDate = (date) =>
    new Date(date).toLocaleDateString('pt-BR');

export const formatPercentage = (value) =>
    `${parseFloat(value).toFixed(2)}%`;

export const formatNumber = (value) =>
    parseFloat(value).toLocaleString('pt-BR');