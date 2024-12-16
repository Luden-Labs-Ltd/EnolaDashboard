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
  const { toast } = useToast();

  const showTost = (error?: any) => {
    if (error) {
        return toast({
            title: `can't copy link ${textToCopy}`,
            variant: "destructive",
            description: error?.message,
          });
    }
    return toast({
      title: `Link copied to your clipboard`,
      variant: "secondary",
      description: new Date().toLocaleDateString(),
    });
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
