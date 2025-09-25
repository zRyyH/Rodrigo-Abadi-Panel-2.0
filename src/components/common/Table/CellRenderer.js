import { Badge } from "@/components/ui/badge";

export function CellRenderer({ item, column }) {
    const value = item[column.key];

    if (column.type === 'badge') {
        return (
            <Badge variant={column.badgeVariant?.(value)}>
                {column.format?.(value) ?? value}
            </Badge>
        );
    }

    if (column.type === 'currency') {
        return (
            <span className="font-medium tabular-nums">
                R$ {Number(value || 0).toFixed(2)}
            </span>
        );
    }

    return <span>{column.format?.(value) ?? value}</span>;
}