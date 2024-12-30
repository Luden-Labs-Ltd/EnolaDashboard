import React, { MouseEvent, useMemo } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@components/shadowCDN/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createQueryString } from "@lib/url";
import { getPageRange } from "./lib";
import { useTranslations } from "next-intl";

interface CustomPaginationProps {
  totalCount: number;
  pagesToShow: number;
  pageSize: number; // Number of items per page
}

export const CustomPagination: React.FC<CustomPaginationProps> = ({
  totalCount,
  pagesToShow,
  pageSize,
}) => {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const goToPage = (newPage: number) => {
    router.push(
      pathname +
        "?" +
        createQueryString("current_page", String(newPage), searchParams)
    );
  };

  const currentPage = searchParams.get("current_page")
    ? Number(searchParams.get("current_page"))
    : 1;

  // Calculate the total number of pages
  const totalPages = Math.ceil(totalCount / pageSize);

  const isRenderFirstEclipse = currentPage > 1 && totalPages > pagesToShow;

  const isRenderLastEclipse =
    currentPage < totalPages - 1 && totalPages > pagesToShow;

  const pageRanges = useMemo(() => {
    return getPageRange({
      totalPages: totalPages,
      currentPage: currentPage,
      pagesToShow: pagesToShow,
      isRenderFirstEclipse,
      isRenderLastEclipse,
    });
  }, [
    currentPage,
    isRenderFirstEclipse,
    isRenderLastEclipse,
    pagesToShow,
    totalPages,
  ]);

  const previousHandler = (event: MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    const previousPage = currentPage - 1;
    if (previousPage < 1) {
      return;
    }
    goToPage(currentPage - 1);
  };

  const nextHandler = (event: MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    const nextPage = currentPage + 1;
    if (nextPage > totalPages) {
      return;
    }
    goToPage(currentPage + 1);
  };

  const onPageClick = (event: MouseEvent, page: number) => {
    event.stopPropagation();
    event.preventDefault();
    goToPage(page);
  };

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
