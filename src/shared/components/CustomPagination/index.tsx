import { createQueryString } from "@lib/url";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { MouseEvent, useMemo } from "react";
import { getPageRange } from "./lib";
import { PaginationWithNumbers } from "./ui/PaginationWithNumbers";
import { PaginationWithButtons } from "./ui/PaginationWithButtons";

export type PaginationType = "numbers" | "buttons";
interface CustomPaginationProps {
  paginationType?: PaginationType;
  totalCount: number;
  pagesToShow: number;
  pageSize: number; // Number of items per page
}

export const CustomPagination: React.FC<CustomPaginationProps> = ({
  paginationType = "numbers",
  totalCount,
  pagesToShow,
  pageSize,
}) => {
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

  switch (paginationType) {
    case "buttons": {
      return (
        <PaginationWithButtons
          currentPage={currentPage}
          totalPages={totalPages}
          pageRanges={pageRanges}
          isRenderFirstEclipse={isRenderFirstEclipse}
          isRenderLastEclipse={isRenderLastEclipse}
          onPageClick={onPageClick}
          previousHandler={previousHandler}
          nextHandler={nextHandler}
        />
      );
    }
    case "numbers":
    default: {
      return (
        <PaginationWithNumbers
          currentPage={currentPage}
          totalPages={totalPages}
          pageRanges={pageRanges}
          isRenderFirstEclipse={isRenderFirstEclipse}
          isRenderLastEclipse={isRenderLastEclipse}
          onPageClick={onPageClick}
          previousHandler={previousHandler}
          nextHandler={nextHandler}
        />
      );
    }
  }
};
