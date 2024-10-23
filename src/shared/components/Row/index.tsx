import React, { PropsWithChildren } from "react";

interface RowProps {
  className?: string;
  alignItems?: "center";
}

const Row: React.FC<PropsWithChildren<RowProps>> = ({ children, className, alignItems }) => {
  return <div className={`flex gap-4 ${className} ${alignItems && "items-" + alignItems}`} >{children}</div>;
};

export default Row;
