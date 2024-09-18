"use client";

import PhoneField from "@components/PhoneField";
import { Button, Link, TextField } from "@mui/material";
import { authenticate, sendOtpCode } from "auth/action";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import withTheme from "shared/hoc/withTheme";

function SingInContent() {
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
          <TextField
            label={t("code")}
            value={otp}
            name="code"
            onChange={(e) => setOtp(e.target.value)}
            data-testid="otp"
            fullWidth
          />
          <Link
            component="button"
            type="button"
            variant="body1"
            color="secondary"
            onClick={sendOtpCodeHandler}
          >
            {t("resend_otp")}
          </Link>
          <Button
            fullWidth
            type="submit"
            color="primary"
            variant="contained"
            data-testid="logInBtn"
            size="large"
          >
            {t("log_in").toUpperCase()}
          </Button>
        </>
      ) : (
        <Button
          fullWidth
          type="button"
          onClick={sendOtpCodeHandler}
          color="primary"
          variant="contained"
          data-testid="sendOtp"
          size="large"
        >
          {t("send_code").toUpperCase()}
        </Button>
      )}
    </form>
  );
}

export default withTheme(SingInContent);
