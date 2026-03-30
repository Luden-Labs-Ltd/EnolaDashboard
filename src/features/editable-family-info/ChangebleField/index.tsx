import Row from "@components/Row";
import React from "react";
import { Header } from "./Header/Header";

export type ChangeableFieldItem = {
  label: string;
  value: string;
  name: string;
  type: "header" | "info";
  href?: string;
  bottomSeparator?: boolean;
};

interface ChangeableFieldProps {
  label: string;
  value: string;
  type?: "header" | "info";
  href?: string;
}

export const ChangeableField: React.FC<ChangeableFieldProps> = ({
  label,
  value,
  type = "info",
  href,
}) => {
  switch (type) {
    case "header":
      return (
        <Row alignItems="center">
          <div className="w-[30%] text-end">
            <Header type="header">{label}</Header>
          </div>
          <div className="w-[70%] h-[26px] flex items-center ">
            <p className="text-[#313E44] text-[18px]">{value}</p>
          </div>
        </Row>
      );
    case "info":
    default:
      return (
        <Row alignItems="center">
          <div className="w-[30%] text-end">
            <Header type="info">{label}</Header>
          </div>

          <div className="w-[70%] h-[26px] flex items-center">
            {href ? (
              <a
                className="inline-block text-[#313E44] no-underline hover:no-underline text-left"
                href={href}
                dir="ltr"
              >
                {value}
              </a>
            ) : (
              <p>{value}</p>
            )}
          </div>
        </Row>
      );
  }
};
