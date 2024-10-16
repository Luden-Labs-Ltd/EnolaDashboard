"use client";

import PhoneField from "@components/PhoneField";
import { Button } from "@components/shadowCDN/button";
import { authenticate, sendOtpCode } from "entities/auth/action";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { OtpInput } from "./ui/OtpInput/OtpInput";

function SingInPage() {
  const t = useTranslations("Auth");

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [showSubmit, setShowSubmit] = useState(false);

  const onPhoneHandler = (phoneNumber: string) => {
    setPhone(phoneNumber);
  };

  const sendOtpCodeHandler = async () => {
    if (!phone) return;

    const otpForm = new FormData();
    otpForm.append("phone_number", phone);
    await sendOtpCode(otpForm);
    setShowSubmit(true);
  };

  return (
    <form
      action={authenticate}
      className="gap-5 flex flex-col items-center w-full max-w-500px"
    >
      <PhoneField
        value={phone}
        onPhoneHandler={onPhoneHandler}
        name="phone_number"
      />

      {showSubmit ? (
        <>
          <OtpInput
            value={otp}
            name="code"
            onChange={(value) => setOtp(value)}
          />
          <Button
            type="button"
            variant={"link"}
            color="secondary"
            onClick={sendOtpCodeHandler}
          >
            {t("resend_otp")}
          </Button>
          <Button
            type="submit"
            size="xl"
            color="primary"
            data-testid="logInBtn"
          >
            {t("log_in").toUpperCase()}
          </Button>
        </>
      ) : (
        <Button
          size={"full"}
          onClick={sendOtpCodeHandler}
          data-testid="sendOtp"
        >
          {t("send_code").toUpperCase()}
        </Button>
      )}
    </form>
  );
}

export default SingInPage;
