import Row from "@components/Row";
import React from "react";
import { Header } from "./Header/Header";

export type ChangeableFieldItem = {
  label: string;
  value: string;
  name: string;
  type: "header" | "info";
  bottomSeparator?: boolean;
};

interface ChangeableFieldProps {
  label: string;
  value: string;
  type?: "header" | "info";
}

export const ChangeableField: React.FC<ChangeableFieldProps> = ({
  label,
  value,
  type = "info",
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
            <p>{value}</p>
          </div>
        </Row>
      );
  }
};
