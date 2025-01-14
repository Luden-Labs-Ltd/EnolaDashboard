import React, { PropsWithChildren } from "react";

interface HeaderProps {
  type: "header" | "info";
}
export const Header: React.FC<PropsWithChildren<HeaderProps>> = ({
  type,
  children,
}) => {
  if (type === "info") {
    return <p className="text-[#4A709A] w-full">{children}</p>;
  }

  return (
    <h3 className="text-[#313E44] font-[565] min-w-[150px] text-[20px]">
      {children}
    </h3>
  );
};
