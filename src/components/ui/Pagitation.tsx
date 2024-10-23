import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";


interface PaginationProps {
  page: number
  totalPages: number
  onNextPage: () => void
  onPreviousPage: () => void
}

export const Pagination = ({page, totalPages, onNextPage, onPreviousPage}: PaginationProps) => {
  const {t} = useTranslation();
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
              {t("components.pagination.previous")}
            </Button>
          )}
          <span>{page} {t("components.pagination.of")} {totalPages}</span>
          {page < totalPages && (
            <Button
              variant="outline"
              size="sm"
              onClick={onNextPage}
            >
              {t("components.pagination.next")}
            </Button>
          )}
        </>
      ): null}
    </div>
  );
}
