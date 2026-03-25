import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@components/shadowCDN/tooltip";
import React, { PropsWithChildren } from "react";

interface TooltipWrapperProps {
  text: string | React.ReactNode;
}
const TooltipWrapper: React.FC<PropsWithChildren<TooltipWrapperProps>> = ({
  text,
  children,
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div>{children}</div>
        </TooltipTrigger>
        <TooltipContent className="bg-[#F1F1F1] text-[#313E44]" side="bottom">
          <p>{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipWrapper;
