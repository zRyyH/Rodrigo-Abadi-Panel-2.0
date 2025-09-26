export const formatCurrency = (value) =>
    `R$ ${parseFloat(value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;

export const formatDate = (date) =>
    new Date(date).toLocaleDateString('pt-BR');

export const formatPercentage = (value) =>
    `${parseFloat(value).toFixed(2)}%`;

export const formatNumber = (value) =>
    parseFloat(value).toLocaleString('pt-BR');

export function formatCEST(value) {
    if (!value) return "";
    const digits = value.toString().replace(/\D/g, "").slice(0, 7);
    return digits
        .replace(/^(\d{2})(\d{3})(\d{0,2}).*/, "$1.$2.$3")
        .replace(/\.$/, "");
}

export function formatNCM(value) {
    if (!value) return "";
    const digits = value.toString().replace(/\D/g, "").slice(0, 8);
    return digits
        .replace(/^(\d{4})(\d{2})(\d{0,2}).*/, "$1.$2.$3")
        .replace(/\.$/, "");
}
