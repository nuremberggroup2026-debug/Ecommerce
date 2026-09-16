import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type Props = {
  slug?: string;
  currentPage: number;
  totalPages: number;
};

export default function PaginationComponent({
  slug,
  currentPage,
  totalPages,
}: Props) {

  let startPage = Math.max(1, currentPage - 1);
  let endPage = Math.min(totalPages, currentPage + 1);

  // إذا كنت في أول صفحة اعرض 1 2 3
  if (currentPage === 1) {
    endPage = Math.min(3, totalPages);
  }

  // إذا كنت في آخر صفحة اعرض آخر 3 صفحات
  if (currentPage === totalPages) {
    startPage = Math.max(totalPages - 2, 1);
  }

  return (
    <Pagination>
      <PaginationContent>

        {/* Previous */}
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious
              href={`/categories/${slug}?page=${currentPage - 1}`}
            />
          </PaginationItem>
        )}


        {Array.from(
          { length: endPage - startPage + 1 },
          (_, index) => startPage + index
        ).map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href={`/categories/${slug}?page=${page}`}
              isActive={page === currentPage}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}


        {/* Next */}
        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext
              href={`/categories/${slug}?page=${currentPage + 1}`}
            />
          </PaginationItem>
        )}

      </PaginationContent>
    </Pagination>
  );
}