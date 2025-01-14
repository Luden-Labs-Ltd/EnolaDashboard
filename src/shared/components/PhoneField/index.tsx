import React from "react";
import PhoneInput, { PhoneInputProps } from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./phoneInput.css"

interface PhoneFieldProps extends PhoneInputProps {
  helperText?: string;
  className?: string;
  error?: boolean;
  required?: boolean;
  size?: 'sm' | 'md',
  onChangeHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onPhoneHandler?: (phone: string) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement, Element>) => void;
  inputStyle?: React.CSSProperties;
  name: string;
}

const PhoneField: React.FC<PhoneFieldProps> = ({
  helperText,
  className,
  error,
  required,
  size = 'md',
  country = "il",
  onPhoneHandler,
  onChangeHandler,
  onBlur,
  inputStyle,
  name,
  ...rest
}) => {

  const inputHeight = size === 'sm' ? 36 : 44
  return (
    <div className={`w-full phoneInput phone-input-container ${className} `} >
      <PhoneInput
        inputProps={{ name }}
        onChange={(phoneNumber, country, e) => {
          onChangeHandler?.(e);
          onPhoneHandler?.(phoneNumber);
        }}
        preferredCountries={['il', 'by', 'ru', 'de', 'ua']}
        onBlur={(e) => {
          onBlur?.(e);
        }}
        inputStyle={{
          height: inputHeight,
          borderRadius: 8,
          minWidth: 0,
          width: "100%",
          ...inputStyle,
        }}
        buttonStyle={{
          borderBottomLeftRadius: 8,
          borderTopLeftRadius: 8,
        }}
        country={country}
        {...rest}
      />
    </div>
  );
};

export default PhoneField;
