import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@components/shadowCDN/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import React from "react";

interface OtpInputProps {
  onChange?: (value: string) => void;
  name: string;
  value?: string;
}

export const OtpInput: React.FC<OtpInputProps> = ({ onChange, ...rest }) => {
  return (
    <InputOTP
      maxLength={6}
      onChange={onChange}
      pattern={REGEXP_ONLY_DIGITS}
      {...rest}
    >
      <InputOTPGroup style={{ direction: 'ltr' }}>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  );
};
