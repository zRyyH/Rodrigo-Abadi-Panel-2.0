import { TableHead, TableRow } from "@/components/ui/table";

export function TableHeaderRow({ columns, showImage, hasActions }) {
    return (
        <TableRow className="border-b border-border">
            {showImage && (
                <TableHead className="w-20 py-4 px-6 text-left">
                    Foto
                </TableHead>
            )}

            {columns.map(column => (
                <TableHead
                    key={column.key}
                    className={`py-4 px-6 text-left font-medium ${column.headerClassName || ''}`}
                >
                    {column.label}
                </TableHead>
            ))}

            {hasActions && (
                <TableHead className="w-32 py-4 px-6 text-right font-medium">
                    Ações
                </TableHead>
            )}
        </TableRow>
    );
}