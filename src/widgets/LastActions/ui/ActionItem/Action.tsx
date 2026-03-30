import React from "react";

interface ActionItemProps {
  date: string | number;
  message: string;
  locale: string;
}

export const ActionItem: React.FC<ActionItemProps> = ({
  date,
  message,
  locale,
}) => {
  const currentDate = new Date(date);
  const stringDate = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
  }).format(currentDate);
  const stringTime = new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
  }).format(currentDate);

  return (
    <div className="flex items-center justify-between gap-4 text-sm">
      <span className="text-[#313E44] text-left">{message}</span>
      <div className="flex shrink-0 items-center gap-2 whitespace-nowrap">
        <span className="font-bold">{stringDate}</span>
        <span className="font-bold text-[#269ACF]">{stringTime}</span>
      </div>
    </div>
  );
};
