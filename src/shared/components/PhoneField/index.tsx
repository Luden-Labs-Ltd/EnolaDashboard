import React from "react";
import PhoneInput, { PhoneInputProps } from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import FormHelperText, {
  FormHelperTextProps,
} from "@mui/material/FormHelperText";
// import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

interface PhoneFieldProps extends PhoneInputProps {
  helperText?: string;
  FormHelperTextProps?: FormHelperTextProps;
  error?: boolean;
  required?: boolean;
  // label: string;
  fullWidth?: boolean;
  onChangeHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onPhoneHandler?: (phone: string) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement, Element>) => void;
  inputStyle?: React.CSSProperties;
  name: string;
}

const PhoneField: React.FC<PhoneFieldProps> = ({
  helperText,
  FormHelperTextProps,
  error,
  required,
  // label,
  country = "il",
  fullWidth = true,
  onPhoneHandler,
  onChangeHandler,
  onBlur,
  inputStyle,
  name,
  ...rest
}) => {
  return (
    <FormControl fullWidth={fullWidth}>
      {/* {label && (
        <InputLabel
          classes={{ root: "label" }}
          // className={classes?.inputLabel}
          required={required}
          error={error}
        >
          {label}
        </InputLabel>
      )} */}
      <PhoneInput
        inputProps={{ name }}
        onChange={(phoneNumber, country, e) => {
          onChangeHandler?.(e);
          onPhoneHandler?.(phoneNumber);
        }}
        onBlur={(e) => {
          onBlur?.(e);
        }}
        inputStyle={{
          height: 44,
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
      {helperText && (
        <FormHelperText error={error} {...FormHelperTextProps}>
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default PhoneField;
