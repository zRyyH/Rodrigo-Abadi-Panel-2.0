import { TableCell, TableRow } from "@/components/ui/table";

export function TableEmptyState({ colSpan }) {
    return (
        <TableRow>
            <TableCell
                colSpan={colSpan}
                className="py-16 text-center text-muted-foreground"
            >
                <div className="flex flex-col items-center gap-2">
                    <div className="text-4xl opacity-50 mb-2">📄</div>
                    <p>Nenhum item encontrado</p>
                </div>
            </TableCell>
        </TableRow>
    );
}