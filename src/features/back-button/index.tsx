import Row from "@components/Row";
import { Button, ButtonProps } from "@components/shadowCDN/button";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React from "react";

export const BackButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ ...props }, ref) => {
    const router = useRouter();
    const t = useTranslations();

    return (
      <Button
        variant={"ghost"}
        onClick={() => {
          router.back();
        }}
        ref={ref}
        {...props}
      >
        <Row alignItems="center" className="gap-[10px]">
          <ArrowLeftIcon />
          {/* {t("Common.goBack")} */}
        </Row>
      </Button>
    );
  }
);

BackButton.displayName = "BackButton";
