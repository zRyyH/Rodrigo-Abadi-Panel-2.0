// DataTable.js - Componente Principal (sem animações e loading)
import { useRouter } from "next/navigation";
import { Table, TableBody, TableHeader } from "@/components/ui/table";
import { TableHeaderRow } from './TableHeaderRow';
import { TableDataRow } from './TableDataRow';
import { TableEmptyState } from './TableEmptyState';
import { TablePagination } from './TablePagination';

export default function DataTable({
    data = [],
    columns = [],
    actions = [],
    showImage = false,
    imageField = "photo",
    nameField = "name",
    clickable = true,
    onRowClick,
    redirectPath,
    idField = "id",
    currentPage = 1,
    totalPages = 1,
    onPageChange = () => { }
}) {
    const router = useRouter();

    const handleRowClick = (item) => {
        if (!clickable) return;

        if (redirectPath) {
            router.push(`${redirectPath}/${item[idField]}`);
        } else if (onRowClick) {
            onRowClick(item);
        }
    };

    const colSpan = columns.length + (showImage ? 1 : 0) + (actions.length > 0 ? 1 : 0);

    return (
        <div className="space-y-8">
            <div className="rounded-lg border border-border bg-card overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableHeaderRow
                            columns={columns}
                            showImage={showImage}
                            hasActions={actions.length > 0}
                        />
                    </TableHeader>

                    <TableBody>
                        {data.length === 0 ? (
                            <TableEmptyState colSpan={colSpan} />
                        ) : (
                            data.map((item, index) => (
                                <TableDataRow
                                    key={item[idField] || index}
                                    item={item}
                                    columns={columns}
                                    actions={actions}
                                    showImage={showImage}
                                    imageField={imageField}
                                    nameField={nameField}
                                    clickable={clickable}
                                    onRowClick={handleRowClick}
                                />
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            <TablePagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
            />
        </div>
    );
}