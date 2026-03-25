"use client";

import { Button } from "@components/shadowCDN/button";
import { ZodErrors } from "@components/ZodErrors/ZodErrors";
import { Program } from "entities/auth/api/types";
import { activateProgram } from "entities/program/action";
import { useTranslations } from "next-intl";
import React, { MouseEvent, useState } from "react";
import { isActionError } from "shared/error/api";

interface ActivateProgramProps {
  programId: string;
  isDisabled: boolean;
  onProgramActivateCallback: (program: Program) => void;
}

export const ActivateProgram: React.FC<ActivateProgramProps> = ({
  isDisabled,
  programId,
  onProgramActivateCallback,
}) => {
  const t = useTranslations();
  const [error, setError] = useState<string>("");

  const handelActivateProgram = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setError('')
    activateProgram(programId).then((res) => {
      if (isActionError(res)) {
        return setError(res.nextError)
      }
      onProgramActivateCallback(res)
    })
  };
  return (
    <>
      <Button onClick={handelActivateProgram} disabled={isDisabled} size={"lg"}>
        {t("Common.activate")}
      </Button>
      {error ? <ZodErrors error={[error]} /> : null}
    </>
  );
};
