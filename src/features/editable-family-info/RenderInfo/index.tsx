import React from "react";
import { ChangeableField, ChangeableFieldItem } from "../ChangebleField";

interface RenderInfoProps {
  renderItems: ChangeableFieldItem[];
}
export const RenderInfo: React.FC<RenderInfoProps> = ({ renderItems }) => {
  return (
    <>
      {renderItems.map((item) => {
        return (
          <ChangeableField
            key={item.name}
            type={item.type}
            label={item.label}
            value={item.value}
          />
        );
      })}
    </>
  );
};
