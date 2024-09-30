import { Button, ButtonProps } from "@mui/material";
import React from "react";

interface FilterButtonProps extends ButtonProps  {}

const FilterButton: React.FC<FilterButtonProps> = ({variant = "outlined", type, ...rest}) => {
  return (
    <Button type="button" className="text-nowrap" variant={variant} {...rest} />
  );
};

export default FilterButton;
