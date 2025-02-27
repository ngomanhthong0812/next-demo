import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

interface IProps {
    page: number,
    totalPage: number,
    setPage: (i: number) => void
}

const MyPagination: React.FC<IProps> = ({ page, totalPage, setPage }) => {
    const renderEllipsis = (index: number) => (
        <PaginationItem key={`ellipsis-${index}`}>
            <PaginationEllipsis />
        </PaginationItem>
    );

    const renderPageNumbers = () => {
        const pages = []
        for (let i = 1; i <= totalPage; i++) {
            if (i === 1 || i === totalPage || (i >= page - 5 && i <= page + 5)) {
                pages.push(
                    <PaginationItem key={i}>
                        <PaginationLink
                            isActive={page === i}
                            onClick={() => setPage(i)}
                        >
                            {i}
                        </PaginationLink>
                    </PaginationItem>
                );
            } else if (i === page - 6 || i === page + 6) {
                pages.push(renderEllipsis(i))
            }
        }
        return pages
    };

    return (
        <Pagination className="mt-5">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious onClick={() => setPage(page > 1 ? (page - 1) : page)} />
                </PaginationItem>
                {renderPageNumbers()}
                <PaginationItem>
                    <PaginationNext onClick={() => setPage(page < totalPage ? (page + 1) : page)} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}

export default MyPagination
