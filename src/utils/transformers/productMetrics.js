import { formatCurrency, formatDate } from '@/utils/formatters'

export const buildProductCards = (data) => [
    {
        label: "Vendas Totais",
        value: data.total_sales,
        description: `${data.units_sold} unidades vendidas`
    },
    {
        label: "Receita Total",
        value: formatCurrency(data.total_revenue),
        description: `Lucro: ${formatCurrency(data.total_profit)}`
    },
    {
        label: "Estoque Atual",
        value: data.stock_quantity,
        description: `Custo: ${formatCurrency(data.purchase_cost)}`
    },
    {
        label: "Preço Médio",
        value: formatCurrency(data.avg_sale_price),
        description: `Última venda: ${formatDate(data.last_sale_date)}`
    }
];