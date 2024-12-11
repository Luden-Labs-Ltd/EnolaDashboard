"use client";

import PhoneField from "@components/PhoneField";
import { Button } from "@components/shadowCDN/button";
import { sendOtpCode, testAction } from "entities/auth/action";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { useFormState } from "react-dom";
import { ZodErrors } from "@components/ZodErrors/ZodErrors";
import { OtpForm } from "./ui/OtpForm/OtpForm";

const INITIAL_STATE = {
  data: null,
};

function SingInPage() {
  const t = useTranslations("Auth");

  const [formState, formAction] = useFormState(testAction, INITIAL_STATE);

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [otpSend, setOtpSend] = useState(false);
  const [showSubmit, setShowSubmit] = useState(false);

  const onPhoneHandler = (phoneNumber: string) => {
    setPhone(phoneNumber);
    setError("");
  };

  const sendOtpCodeHandler = async () => {
    if (!phone) {
      setError("enter correct phone");
      return;
    }
    setOtpSend(true);

    const otpForm = new FormData();
    otpForm.append("phone_number", phone);
    sendOtpCode(otpForm)
      .then(() => {
        setShowSubmit(true);
        setOtpSend(false);
      })
      .catch((error) => {
        setShowSubmit(false);
        setOtpSend(false);
        setError(error.message)
      });
  };

  const apiError = formState?.apiError
    ? formState?.apiError
    : error
    ? error
    : null;

  return (
    <form
      action={formAction}
      className="gap-5 flex flex-col items-center w-full max-w-500px"
    >
      <PhoneField
        value={phone}
        onPhoneHandler={onPhoneHandler}
        name="phone_number"
      />
      <ZodErrors error={formState?.zodErrors?.phoneNumber} />

      {showSubmit ? (
        <OtpForm
          otpValue={otp}
          apiError={apiError}
          formErrors={formState?.zodErrors}
          onChangeOtp={(code) => setOtp(code)}
          sendOtpCodeHandler={sendOtpCodeHandler}
          disabled={otpSend}
        />
      ) : (
        <>
          <Button
            size={"full"}
            onClick={sendOtpCodeHandler}
            type="button"
            disabled={otpSend}
            data-testid="sendOtp"
          >
            {t("send_code").toUpperCase()}
          </Button>
          {apiError ? <ZodErrors error={[apiError]} /> : null}
        </>
      )}
    </form>
  );
}

export default SingInPage;
