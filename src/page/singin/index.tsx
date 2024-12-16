"use client";

import PhoneField from "@components/PhoneField";
import { Button } from "@components/shadowCDN/button";
import { sendOtpCode, testAction } from "entities/auth/action";
import { useTranslations } from "next-intl";
import React, { MouseEvent, useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import { ZodErrors } from "@components/ZodErrors/ZodErrors";
import { OtpForm } from "./ui/OtpForm/OtpForm";
import Loading from "app/(main)/loading";

const INITIAL_STATE = {
  data: null,
};

function SingInPage() {
  const t = useTranslations("Auth");

  const [formState, formAction] = useFormState(testAction, INITIAL_STATE);

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isRequestLoading, setIsRequestLoading] = useState(false);
  const [showSubmit, setShowSubmit] = useState(false);

  useEffect(() => {
    if (formState.data === "false") {
      setIsRequestLoading(false)
    }
  }, [formState]);

  const form = useRef<HTMLFormElement | null>(null);
  const onPhoneHandler = (phoneNumber: string) => {
    setPhone(phoneNumber);
    setError("");
  };

  const sendOtpCodeHandler = async () => {
    if (!phone) {
      setError("enter correct phone");
      return;
    }
    setIsRequestLoading(true);

    const otpForm = new FormData();
    otpForm.append("phone_number", phone);
    sendOtpCode(otpForm).then((res) => {
      if (res?.error) {
        setShowSubmit(false);
        setIsRequestLoading(false);
        setError(res?.error);
        return;
      }
      setShowSubmit(true);
      setIsRequestLoading(false);
    });
  };

  const onSubmitHandler = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    setIsRequestLoading(true);
    form.current?.requestSubmit();
  };

  const apiError = formState?.apiError
    ? formState?.apiError
    : error
    ? error
    : null;

  return (
    <form
      action={formAction}
      ref={form}
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
          onSubmitHandler={onSubmitHandler}
          formErrors={formState?.zodErrors}
          onChangeOtp={(code) => setOtp(code)}
          sendOtpCodeHandler={sendOtpCodeHandler}
          disabled={isRequestLoading}
        />
      ) : (
        <>
          <Button
            size={"full"}
            onClick={sendOtpCodeHandler}
            type="button"
            disabled={isRequestLoading}
            data-testid="sendOtp"
          >
            {t("send_code").toUpperCase()}
          </Button>
          {apiError ? <ZodErrors error={[apiError]} /> : null}
        </>
      )}
      {isRequestLoading ? <Loading /> : null}
    </form>
  );
}

export default SingInPage;
