import { Button } from "@components/shadowCDN/button";
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
import FirstPageIcon from "shared/assets/pagination/FirstPageIcon";
import LastPageIcon from "shared/assets/pagination/LastPageIcon";
import NextIcon from "shared/assets/pagination/NextIcon";
import PreviousIcon from "shared/assets/pagination/PreviousIcon";

interface PaginationWithButtonsProps {
  currentPage: number;
  totalPages: number;
  pageRanges: number[];
  isRenderFirstEclipse: boolean;
  isRenderLastEclipse: boolean;
  previousHandler: (event: MouseEvent) => void;
  nextHandler: (event: MouseEvent) => void;
  onPageClick: (event: MouseEvent, page: number) => void;
}

export const PaginationWithButtons: React.FC<PaginationWithButtonsProps> = ({
  currentPage,
  totalPages,
  pageRanges,
  isRenderFirstEclipse,
  isRenderLastEclipse,
  onPageClick,
  previousHandler,
  nextHandler,
}) => {
  const t = useTranslations();

  return (
    <Pagination className="justify-end">
      <div className="justify-center flex flex-1">
        <Button variant={"secondary"} size={"lg"} rounded={"circle"}>
          {t("Common.next")}
        </Button>
      </div>
      <PaginationContent>
        <PaginationItem>1-10 of 100</PaginationItem>
        <PaginationItem>
          <Button
            variant={"ghost"}
            size={"icon"}
            onClick={(e) => onPageClick(e, 1)}
          >
            <FirstPageIcon />
          </Button>
        </PaginationItem>
        <PaginationItem>
          <Button
            variant={"ghost"}
            size={"icon"}
            onClick={previousHandler}
          >
            <PreviousIcon />
          </Button>
        </PaginationItem>
        <PaginationItem>{currentPage} of {totalPages}</PaginationItem>
        <PaginationItem>
          <Button
            variant={"ghost"}
            size={"icon"}
            onClick={nextHandler}
          >
            <NextIcon />
          </Button>
        </PaginationItem>
        <PaginationItem>
          <Button
            variant={"ghost"}
            size={"icon"}
            onClick={(e) => onPageClick(e, totalPages)}
          >
            <LastPageIcon />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
