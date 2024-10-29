import { Button } from "@components/shadowCDN/button";
import React from "react";
import { OtpInput } from "../OtpInput/OtpInput";
import { useTranslations } from "next-intl";
import { ZodErrors } from "@components/ZodErrors/ZodErrors";

interface OtpFormProps {
  otpValue: string;
  onChangeOtp: (code: string) => void;
  formErrors: Record<string, string[]>;
  apiError: string | null;
  sendOtpCodeHandler: () => void;
  disabled: boolean;
}

export const OtpForm: React.FC<OtpFormProps> = ({
  onChangeOtp,
  sendOtpCodeHandler,
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
        type="submit"
        size="xl"
        disabled={disabled}
        color="primary"
        data-testid="logInBtn"
      >
        {t("log_in").toUpperCase()}
      </Button>
      {apiError ? <ZodErrors error={[apiError]} /> : null }
    </>
  );
};
