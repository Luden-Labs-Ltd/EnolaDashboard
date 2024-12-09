"use client";

import React, {
  ChangeEvent,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import styles from "./searchPanel.module.scss";
import SearchIcon from "shared/assets/SearchIcon";
import SortIcon from "shared/assets/SortIcon";
import { Input } from "@components/shadowCDN/input";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useDebounce from "@hooks/useDebounce";
import { Button } from "@components/shadowCDN/button";
import { createQueryString } from "@lib/url";

interface SearchPanelProps {
  searchParamName: string;
  filterForm?: React.ReactNode;
}

const SearchPanel: React.FC<PropsWithChildren<SearchPanelProps>> = ({
  children,
  searchParamName,
  filterForm,
}) => {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchParamValue, setSearchParamValue] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const debounceSearchParam = useDebounce(searchParamValue, 300);

  useEffect(() => {
    router.push(
      pathname + "?" + createQueryString(searchParamName, debounceSearchParam, searchParams)
    );
  }, [debounceSearchParam, pathname, router, searchParamName, searchParams]);

  const onSortClick = () => {
    setFiltersOpen((prev) => !prev);
  };

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchParamValue(event.currentTarget.value);
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.searchWrapper}>
          <div className={"flex items-center gap-2"}>
            <SearchIcon />
            <Input
              id="outlined-basic"
              value={searchParamValue}
              onChange={onChangeHandler}
              placeholder={t("Common.search")}
            />
          </div>
          <Button
            variant={"ghost"}
            className={"flex items-center gap-2 cursor-pointer"}
            onClick={onSortClick}
          >
            <SortIcon />
            <div>{t("Common.sort")}</div>
          </Button>
        </div>

        {children}
      </div>
      {filtersOpen ? <div className="px-[30px]">{filterForm}</div> : null}
    </>
  );
};

export default SearchPanel;
