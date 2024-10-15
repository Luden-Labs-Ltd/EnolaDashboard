import React, { PropsWithChildren } from "react";

interface RowProps {
  className?: string;
}

const Row: React.FC<PropsWithChildren<RowProps>> = ({ children, className }) => {
  return <div className={`flex gap-4 ${className}`} >{children}</div>;
};

export default Row;
