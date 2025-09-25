import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";

export function TablePagination({ currentPage, totalPages, onPageChange }) {
    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
        if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);

        if (currentPage <= 3) return [1, 2, 3, 4, 5];
        if (currentPage >= totalPages - 2) return Array.from({ length: 5 }, (_, i) => totalPages - 4 + i);

        return Array.from({ length: 5 }, (_, i) => currentPage - 2 + i);
    };

    return (
        <div className="flex justify-center mt-8 pb-8">
            <Pagination>
                <PaginationContent className="gap-1">
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
                            className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer hover:bg-accent"}
                        />
                    </PaginationItem>

                    {getPageNumbers().map((pageNumber) => (
                        <PaginationItem key={pageNumber}>
                            <PaginationLink
                                onClick={() => onPageChange(pageNumber)}
                                isActive={currentPage === pageNumber}
                                className="cursor-pointer min-w-10 hover:bg-accent"
                            >
                                {pageNumber}
                            </PaginationLink>
                        </PaginationItem>
                    ))}

                    <PaginationItem>
                        <PaginationNext
                            onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
                            className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer hover:bg-accent"}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}