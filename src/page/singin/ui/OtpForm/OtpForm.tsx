import { Button } from "@components/shadowCDN/button";
import { ZodErrors } from "@components/ZodErrors/ZodErrors";
import { useTranslations } from "next-intl";
import React, { MouseEvent } from "react";
import { OtpInput } from "../OtpInput/OtpInput";

interface OtpFormProps {
  otpValue: string;
  onChangeOtp: (code: string) => void;
  formErrors: Record<string, string[]>;
  apiError: string | null;
  sendOtpCodeHandler: () => void;
  onSubmitHandler: (event: MouseEvent<HTMLButtonElement>) => void;
  disabled: boolean;
}

export const OtpForm: React.FC<OtpFormProps> = ({
  onChangeOtp,
  sendOtpCodeHandler,
  onSubmitHandler,
  formErrors,
  apiError,
  otpValue,
  disabled,
}) => {
  const t = useTranslations("Auth");
  return (
    <>
      <OtpInput value={otpValue} name="code" onChange={onChangeOtp} />
      <ZodErrors error={formErrors?.code} />
      <Button
        type="button"
        variant={"link"}
        disabled={disabled}
        color="secondary"
        onClick={sendOtpCodeHandler}
      >
        {t("resend_otp")}
      </Button>
      <Button
        size="xl"
        onClick={onSubmitHandler}
        disabled={disabled}
        color="primary"
        data-testid="logInBtn"
      >
        {t("log_in").toUpperCase()}
      </Button>
      {apiError ? <ZodErrors error={[apiError]} /> : null}
    </>
  );
};
