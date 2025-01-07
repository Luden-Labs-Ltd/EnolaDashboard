import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from "@components/shadowCDN/pagination";
import { useTranslations } from "next-intl";
import React, { MouseEvent } from "react";

interface PaginationWithNumbersProps {
    currentPage: number;
    totalPages: number;
    pageRanges: number[]
    isRenderFirstEclipse: boolean;
    isRenderLastEclipse: boolean;
    previousHandler: (event: MouseEvent) => void;
    nextHandler: (event: MouseEvent) => void;
    onPageClick: (event: MouseEvent, page: number) => void;
}

export const PaginationWithNumbers: React.FC<PaginationWithNumbersProps> = ({
    currentPage,
    totalPages,
    pageRanges,
    isRenderFirstEclipse,
    isRenderLastEclipse,
    onPageClick,
    previousHandler,
    nextHandler
}) => {
  const t = useTranslations();

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            textLabel={t("Common.previous")}
            onClick={previousHandler}
            href="#"
            // disabled={currentPage === 1}
          />
        </PaginationItem>

        {isRenderFirstEclipse && currentPage !== 1 && (
          <PaginationItem>
            <PaginationLink href="#" onClick={(e) => onPageClick(e, 1)}>
              1
            </PaginationLink>
          </PaginationItem>
        )}
        {isRenderFirstEclipse && <PaginationEllipsis />}

        {pageRanges.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href="#"
              onClick={(e) => onPageClick(e, page)}
              isActive={page === currentPage}
              style={{
                background:
                  page === currentPage ? "hsl(var(--primary))" : undefined,
                color:
                  page === currentPage
                    ? "hsl(var(--primary-foreground))"
                    : undefined,
              }}
              aria-current={page === currentPage ? "page" : undefined}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {isRenderLastEclipse && <PaginationEllipsis />}

        {isRenderLastEclipse && currentPage !== totalPages && (
          <>
            <PaginationItem>
              <PaginationLink
                href="#"
                onClick={(e) => onPageClick(e, totalPages)}
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        <PaginationItem>
          <PaginationNext
            textLabel={t("Common.next")}
            onClick={nextHandler}
            href="#"
            // disabled={currentPage === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
