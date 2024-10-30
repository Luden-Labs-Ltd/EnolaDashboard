import Row from "@components/Row";
import { format } from "date-fns";
import React from "react";

interface NoteProps {
  date: number;
  message: string;
}

export const Note: React.FC<NoteProps> = ({ date, message }) => {
  const currentDate = new Date(date);
  const stringDate = format(date, "d MMMM");
  const stringTime = currentDate.toLocaleTimeString();
  return (
    <div className="flex flex-col gap-[10px]">
      <Row alignItems="center" className="justify-end text-[12px]">
        <span className="text-[#4A709A]">{stringDate}</span>
        <span className="text-[#4A709A]">{stringTime}</span>
      </Row>
      <p className="text-[#313E44] text-[16px] max-w-[388px]">{message}</p>
    </div>
  );
};
