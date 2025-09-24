import { TableCell, TableRow } from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CellRenderer } from './CellRenderer';
import { settings } from '@/constants/config';

export function TableDataRow({
    item,
    columns,
    actions,
    showImage,
    imageField,
    nameField,
    clickable,
    onRowClick
}) {
    const getImageUrl = (item) => {
        if (!item) return null;
        return `${settings.directus_url}/assets/${item?.gallery[0]?.directus_files_id}`;
    };

    return (
        <TableRow
            className={`border-b border-border last:border-b-0 ${clickable ? "cursor-pointer hover:bg-muted/50" : ""}`}
            onClick={() => onRowClick(item)}
        >
            {showImage && (
                <TableCell className="py-4 px-6" onClick={e => e.stopPropagation()}>
                    <Avatar className="h-12 w-12">
                        <AvatarImage
                            src={getImageUrl(item)}
                            alt={item[nameField] || 'Imagem'}
                        />
                        <AvatarFallback className="bg-muted text-muted-foreground">
                            {item[nameField]?.charAt(0)?.toUpperCase() || '?'}
                        </AvatarFallback>
                    </Avatar>
                </TableCell>
            )}

            {columns.map(column => (
                <TableCell
                    key={column.key}
                    className={`py-4 px-6 ${column.cellClassName || ''}`}
                >
                    <CellRenderer item={item} column={column} />
                </TableCell>
            ))}

            {actions.length > 0 && (
                <TableCell className="py-4 px-6 text-right" onClick={e => e.stopPropagation()}>
                    <div className="flex gap-2 justify-end">
                        {actions.map((action, actionIndex) => (
                            <Button
                                key={actionIndex}
                                variant={action.variant || "outline"}
                                size={action.size || "sm"}
                                onClick={() => action.onClick(item)}
                                disabled={action.disabled?.(item)}
                                className={action.className || ''}
                            >
                                {action.icon}
                                {action.label}
                            </Button>
                        ))}
                    </div>
                </TableCell>
            )}
        </TableRow>
    );
}