import { useToast } from "@hooks/use-toast";
import React, { PropsWithChildren } from "react";

interface CopyTextProps {
  callback?: () => void;
  textToCopy: string;
}

export const CopyText: React.FC<PropsWithChildren<CopyTextProps>> = ({
  children,
  textToCopy,
  callback,
}) => {
  const toast = useToast();

  const showTost = (error?: any) => {
    if (error) {
        return toast.error(`can't copy link ${textToCopy}`);
    }
    return toast.info(`Link copied to your clipboard`)
  };

  const copyTextHandler = () => {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        showTost()
      })
      .catch((err) => {
        showTost(err?.message ?? "un catch error")
      })
      .finally(() => {
        callback?.();
      });
  };
  return <div onClick={copyTextHandler}>{children}</div>;
};
