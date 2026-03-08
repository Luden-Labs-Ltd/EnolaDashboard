"use client";

import React, { useState, useEffect } from "react";
import {
  format,
  startOfWeek,
  addDays,
  isSameDay,
  isToday,
  addWeeks,
  subWeeks,
  startOfMonth,
  endOfMonth,
  startOfWeek as startWeek,
  endOfWeek,
  isSameMonth,
  addMonths,
  subMonths,
} from "date-fns";
import { enUS, he } from "date-fns/locale";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@components/shadowCDN/dropdown-menu";

interface TaskCalendarProps {
  date: Date;
  onDateChange: (date: Date) => void;
  datesWithEvents?: string[];
  className?: string;
}

const WEEKDAY_KEYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"] as const;

export const TaskCalendar: React.FC<TaskCalendarProps> = ({
  date,
  onDateChange,
  datesWithEvents = [],
  className,
}) => {
  const eventsSet = React.useMemo(() => new Set(datesWithEvents), [datesWithEvents]);
  const t = useTranslations("FamilyTasks");
  const locale = useLocale();
  const dateLocale = locale === "he" ? he : enUS;
  const isRtl = locale === "he";
  const weekStartsOn = locale === "he" ? 0 : 0;

  const [weekStart, setWeekStart] = useState<Date>(() =>
    startOfWeek(date, { weekStartsOn })
  );

  useEffect(() => {
    setWeekStart(startOfWeek(date, { weekStartsOn }));
  }, [date, weekStartsOn]);

  const weekDays = Array.from({ length: 7 }, (_, i) =>
    addDays(weekStart, i)
  );

  const goPrevWeek = () => {
    setWeekStart((prev) => subWeeks(prev, 1));
  };

  const goNextWeek = () => {
    setWeekStart((prev) => addWeeks(prev, 1));
  };

  const handleDaySelect = (d: Date) => {
    onDateChange(d);
  };

  const handleToday = () => {
    const today = new Date();
    setWeekStart(startOfWeek(today, { weekStartsOn }));
    onDateChange(today);
  };

  const [popoverOpen, setPopoverOpen] = useState(false);
  const [viewMonth, setViewMonth] = useState(() => date);

  useEffect(() => {
    if (popoverOpen) setViewMonth(date);
  }, [popoverOpen, date]);

  const monthStart = startOfMonth(viewMonth);
  const monthEnd = endOfMonth(viewMonth);
  const calStart = startWeek(monthStart, { weekStartsOn: 0 });
  const calEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });
  const popoverDays: Date[] = [];
  let d = calStart;
  while (d <= calEnd) {
    popoverDays.push(d);
    d = addDays(d, 1);
  }

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="flex items-center justify-between rounded-xl border border-[#DCE5FF] bg-[#F5F8FF] px-4 py-3">
        <DropdownMenu open={popoverOpen} onOpenChange={setPopoverOpen}>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="text-base font-medium text-[#313A56] hover:opacity-80"
            >
              {format(date, "MMMM, yyyy", { locale: dateLocale })}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="min-w-[280px] rounded-xl border-[#DCE5FF] bg-white p-4"
            align={isRtl ? "end" : "start"}
          >
            <div className="mb-3 flex items-center justify-between">
              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-[#313A56] hover:bg-[#E8EEFF]"
                onClick={() => setViewMonth((m) => subMonths(m, 1))}
                aria-label="Previous month"
              >
                <ChevronIcon className="h-4 w-4 rotate-90" />
              </button>
              <span className="text-sm font-semibold text-[#313A56]">
                {format(viewMonth, "MMMM yyyy", { locale: dateLocale })}
              </span>
              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-[#313A56] hover:bg-[#E8EEFF]"
                onClick={() => setViewMonth((m) => addMonths(m, 1))}
                aria-label="Next month"
              >
                <ChevronIcon className="h-4 w-4 -rotate-90" />
              </button>
            </div>
            <div className="mb-2 grid grid-cols-7 gap-0.5 text-center text-xs font-medium text-[#A3ABC3]">
              {WEEKDAY_KEYS.map((key) => (
                <div key={key}>{t(`weekdayShort.${key}`)}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-0.5">
              {popoverDays.map((day) => {
                const inMonth = isSameMonth(day, viewMonth);
                const selected = isSameDay(day, date);
                const today = isToday(day);
                return (
                  <button
                    key={day.toISOString()}
                    type="button"
                    onClick={() => {
                      onDateChange(day);
                      setWeekStart(startOfWeek(day, { weekStartsOn }));
                      setPopoverOpen(false);
                    }}
                    className={cn(
                      "flex h-8 w-8 flex-col items-center justify-center rounded-lg text-sm",
                      !inMonth && "text-[#DCE5FF]",
                      inMonth && "text-[#313A56]",
                      selected && "bg-[#269ACF] text-white",
                      !selected && inMonth && today && "ring-1 ring-[#269ACF]",
                      inMonth && !selected && "hover:bg-[#E8EEFF]"
                    )}
                  >
                    {format(day, "d")}
                    {inMonth && eventsSet.has(format(day, "yyyy-MM-dd")) && (
                      <span
                        className={cn(
                          "mt-0.5 h-1 w-1 rounded-full opacity-70",
                          selected ? "bg-white" : "bg-[#313A56]"
                        )}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        <button
          type="button"
          onClick={handleToday}
          className="text-base font-medium text-[#313A56] underline underline-offset-2 hover:opacity-80"
        >
          {t("today")}
        </button>
      </div>

      <div className="flex h-[70px] items-center justify-between gap-2 rounded-xl border border-[#DCE5FF] bg-[#F5F8FF] px-3 py-2">
        <button
          type="button"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-[#313A56] hover:bg-[#E8EEFF]"
          onClick={goPrevWeek}
          aria-label="Previous week"
        >
          <ChevronIcon className="h-5 w-5 rotate-90" />
        </button>
        <div className="flex flex-1 items-center justify-between gap-1 px-0">
          {weekDays.map((day) => {
            const selected = isSameDay(day, date);
            const today = isToday(day);
            return (
              <button
                key={day.toISOString()}
                type="button"
                onClick={() => handleDaySelect(day)}
                className={cn(
                  "flex flex-1 flex-col items-center justify-center rounded-lg py-2 border-2 min-w-0",
                  selected && "border-transparent bg-[#313A56] text-white",
                  !selected && "border-transparent text-[#313A56] hover:bg-[#E8EEFF]",
                  !selected && today && "border-[#269ACF]"
                )}
              >
                <span className="mb-1 text-[11px] font-semibold uppercase leading-none text-inherit opacity-90">
                  {format(day, "EEE", { locale: dateLocale })}
                </span>
                <span className="text-sm font-semibold">
                  {format(day, "d")}
                </span>
                {eventsSet.has(format(day, "yyyy-MM-dd")) && (
                  <span
                    className={cn(
                      "mt-1 h-1 w-1 rounded-full opacity-70",
                      selected ? "bg-white" : "bg-[#313A56]"
                    )}
                  />
                )}
              </button>
            );
          })}
        </div>
        <button
          type="button"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-[#313A56] hover:bg-[#E8EEFF]"
          onClick={goNextWeek}
          aria-label="Next week"
        >
          <ChevronIcon className="h-5 w-5 -rotate-90" />
        </button>
      </div>
    </div>
  );
};

const ChevronIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 16 16" fill="none" className={className}>
    <path
      d="M4 6l4 4 4-4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
