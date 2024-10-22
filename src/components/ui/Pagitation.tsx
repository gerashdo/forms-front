import { Button } from "@/components/ui/button";


interface PaginationProps {
  page: number
  totalPages: number
  onNextPage: () => void
  onPreviousPage: () => void
}

export const Pagination = ({page, totalPages, onNextPage, onPreviousPage}: PaginationProps) => {
  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      {totalPages > 1 ? (
        <>
          {page > 1 && (
            <Button
              variant="outline"
              size="sm"
              onClick={onPreviousPage}
              disabled={page === 1}
            >
              Previous
            </Button>
          )}
          <span>{page} of {totalPages}</span>
          {page < totalPages && (
            <Button
              variant="outline"
              size="sm"
              onClick={onNextPage}
            >
              Next
            </Button>
          )}
        </>
      ): null}
    </div>
  );
}
