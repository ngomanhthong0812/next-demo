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
    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious onClick={() => setPage(page > 1 ? (page - 1) : page)} />
                </PaginationItem>
                {Array.from({ length: totalPage }, (_, i) => (
                    <PaginationItem key={i}>
                        <PaginationLink
                            isActive={page === i + 1}
                            onClick={() => setPage(i + 1)}
                        >
                            {i + 1}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                {/* <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem> */}
                <PaginationItem>
                    <PaginationNext onClick={() => setPage(page < totalPage ? (page + 1) : page)} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}

export default MyPagination
