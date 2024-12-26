import { createQueryString } from "@lib/url";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import SortIcons from "shared/assets/SortIcons";

type SortOrder = "desc" | "asc";

interface SortArrowsProps {
  sortName: string;
  sortOrder?: SortOrder;
}

export const SortArrows: React.FC<SortArrowsProps> = ({
  sortName,
  sortOrder = "desc",
}) => {
  const [order, setOrder] = useState<SortOrder>(sortOrder);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const onClickHandler = () => {
    setOrder((prev) => (prev === "desc" ? "asc" : "desc"));
    const sortConfig = JSON.stringify({
      name: sortName,
      order,
    });
    router.push(
      pathname + "?" + createQueryString("sort", sortConfig, searchParams)
    );
  };

  const color = order === "asc" ? "#B4E5F4" : "";
  return (
    <SortIcons
      className="cursor-pointer"
      onClick={onClickHandler}
      color={color}
      height={16}
      width={16}
    />
  );
};
