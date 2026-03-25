import React from "react";
import { ICON_MAP } from "../ui/Category";

type RenderCategoryIconProps = {
  icon: string;
  customIcon?: string | React.ReactNode;
};

export const RenderCategoryIcon: React.FC<RenderCategoryIconProps> = ({
  icon,
  customIcon,
}) => {
  const defaultIcon = ICON_MAP[icon];

  const iconComponent = customIcon ? customIcon : defaultIcon;

  if (iconComponent) {
    return iconComponent;
  }
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: icon,
      }}
    ></div>
  );
};
