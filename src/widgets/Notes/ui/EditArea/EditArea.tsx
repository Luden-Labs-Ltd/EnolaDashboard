import { Textarea } from "@components/shadowCDN/textarea";
import React from "react";

interface EditAreaProps {
  message: string;
  isEdit: boolean;
  onChange: (newMessage: string) => void;
  onClick: () => void;
  onClose?: () => void;
}

export const EditArea: React.FC<EditAreaProps> = ({
  message,
  isEdit,
  onClick,
  onChange,
  onClose,
}) => {
  if (!isEdit) {
    return (
      <p onClick={onClick} className="text-[#313E44] text-[16px] max-w-[388px]">
        {message}
      </p>
    );
  }

  return (
    <Textarea
      value={message}
      onBlur={onClose}
      onChange={(event) => {
        onChange(event.currentTarget.value);
      }}
      className={`h-[100px] border-[1px] border-none outline-none shadow-none ring-0 focus-visible:ring-0`}
    />
  );
};
