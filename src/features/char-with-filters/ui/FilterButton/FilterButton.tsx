import { Toggle } from "@components/shadowCDN/toggle";
import React, { PropsWithChildren } from "react";

export type FilterColors =
  | "primary"
  | "secondary"
  | "warning"
  | "success"
  | "error";

interface FilterButtonProps {
  variant: "active" | "disabled";
  color: FilterColors;
  onClick: () => void;
}

const FilterButton: React.FC<PropsWithChildren<FilterButtonProps>> = ({
  variant = "disabled",
  color,
  ...rest
}) => {
  const colorClasses: Record<FilterColors, string> = {
    primary: "data-[state=on]:bg-blue-500 data-[state=off]:border-2 border-blue-500 text-blue-500",
    secondary: "data-[state=on]:bg-fuchsia-500 data-[state=off]:border-2 border-fuchsia-500 text-fuchsia-500",
    warning: "data-[state=on]:bg-yellow-600 data-[state=off]:border-2 border-yellow-600 text-yellow-600",
    success: "data-[state=on]:bg-green-500 data-[state=off]:border-2 border-green-500 text-green-500",
    error: "data-[state=on]:bg-violet-500 data-[state=off]:border-2 border-violet-500 text-violet-500",
  };

  return (
    <Toggle className={colorClasses[color]} variant={"clear"} {...rest}/>
  );
};

export default FilterButton;
