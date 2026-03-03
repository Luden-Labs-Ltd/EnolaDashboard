import classNames from "classnames";
import React, { useState, useMemo } from "react";
import {
  DateRangePicker as DateRangeLibrary,
  createStaticRanges,
} from "react-date-range";
import "./daterange.css";
import styles from "./daterange.module.scss";
import {
  addDays,
  addMonths,
  differenceInCalendarDays,
  endOfDay,
  endOfMonth,
  endOfWeek,
  isSameDay,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { enUS, he, ru } from "date-fns/locale";
import { Button } from "@components/shadowCDN/button";
import { useLocale, useTranslations } from "next-intl";

export type DateRangeItem = {
  startDate: Date | null;
  endDate: Date | null;
  key: "selection";
};

interface DateRangePickerProps {
  dates: Array<DateRangeItem>;
  onChangeDate: (dates: Array<DateRangeItem>) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  dates,
  onChangeDate,
}) => {
  const appLocale = useLocale();
  const t = useTranslations();

  const calendarLocale =
    appLocale === "he" ? he : appLocale === "ru" ? ru : enUS;

  const browserLocale =
    appLocale === "he" ? "he-IL" : appLocale === "ru" ? "ru-RU" : "en-US";

  const originDates = [...dates];

  const currentDate = new Date()
  const defaultDates = [
    {
      startDate: currentDate,
      endDate: addDays(currentDate, 7),
      key: "selection",
    } as const,
  ];

  const [datepickerState, setDatepickerState] = useState({
    dates: dates,
  });

  const isDatesNull = !datepickerState.dates[0].startDate && !datepickerState.dates[0].endDate
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const firstDate = datepickerState.dates[0]?.startDate?.toLocaleDateString(
    browserLocale
  );
  const secondeDate = datepickerState.dates[0]?.endDate?.toLocaleDateString(
    browserLocale
  );
  const dateTemplate = isDatesNull ? t('Common.setDate') : `${firstDate} - ${secondeDate}`;

  const staticRanges = useMemo(
    () =>
      createStaticRanges([
        {
          label: t("Common.dateRange.today"),
          range: () => {
            const now = new Date();
            return {
              startDate: startOfDay(now),
              endDate: endOfDay(now),
            };
          },
        },
        {
          label: t("Common.dateRange.yesterday"),
          range: () => {
            const yesterday = addDays(new Date(), -1);
            return {
              startDate: startOfDay(yesterday),
              endDate: endOfDay(yesterday),
            };
          },
        },
        {
          label: t("Common.dateRange.thisWeek"),
          range: () => {
            const now = new Date();
            return {
              startDate: startOfWeek(now),
              endDate: endOfWeek(now),
            };
          },
        },
        {
          label: t("Common.dateRange.lastWeek"),
          range: () => {
            const now = new Date();
            const lastWeek = addDays(now, -7);
            return {
              startDate: startOfWeek(lastWeek),
              endDate: endOfWeek(lastWeek),
            };
          },
        },
        {
          label: t("Common.dateRange.thisMonth"),
          range: () => {
            const now = new Date();
            return {
              startDate: startOfMonth(now),
              endDate: endOfMonth(now),
            };
          },
        },
        {
          label: t("Common.dateRange.lastMonth"),
          range: () => {
            const now = new Date();
            const lastMonth = addMonths(now, -1);
            return {
              startDate: startOfMonth(lastMonth),
              endDate: endOfMonth(lastMonth),
            };
          },
        },
      ]),
    [t]
  );

  const inputRanges = useMemo(
    () => [
      {
        label: t("Common.dateRange.daysUpToToday"),
        range: (value: number) => {
          const now = new Date();
          return {
            startDate: addDays(startOfDay(now), (Math.max(Number(value), 1) - 1) * -1),
            endDate: endOfDay(now),
          };
        },
        getCurrentValue: (range: { startDate?: Date; endDate?: Date }) => {
          const now = new Date();
          if (!range.endDate || !isSameDay(range.endDate, endOfDay(now))) return "-";
          if (!range.startDate) return "∞";
          return String(differenceInCalendarDays(endOfDay(now), range.startDate) + 1);
        },
      },
      {
        label: t("Common.dateRange.daysStartingToday"),
        range: (value: number) => {
          const today = new Date();
          return {
            startDate: today,
            endDate: addDays(today, Math.max(Number(value), 1) - 1),
          };
        },
        getCurrentValue: (range: { startDate?: Date; endDate?: Date }) => {
          const now = new Date();
          if (!range.startDate || !isSameDay(range.startDate, startOfDay(now))) return "-";
          if (!range.endDate) return "∞";
          return String(differenceInCalendarDays(range.endDate, startOfDay(now)) + 1);
        },
      },
    ],
    [t]
  );

  const onDateChange = (item: any) => {
    const newDates = item.selection;
    return setDatepickerState({
      dates: [newDates],
    });
  };

  const onCloseHandler = () => {
    setDatepickerState({
      dates: originDates,
    });
    setIsDropDownOpen(false);
  };

  const onClearHandler = () => {
    const nullDates = [
      {
        startDate: null,
        endDate: null,
        key: "selection",
      },
    ];

    setDatepickerState({
      // @ts-ignore
      dates: nullDates,
    });
    // @ts-ignore
    onChangeDate(nullDates);
    setIsDropDownOpen(false);
  };


  const onSetHandler = () => {
    if (!isDatesNull) {
      onChangeDate?.(datepickerState.dates);
      return setIsDropDownOpen(false);
    }
    onChangeDate?.(defaultDates);
    setDatepickerState({
      dates: defaultDates
    })
    setIsDropDownOpen(false);
  };

  return (
    <div
      className={classNames(styles.wrapper, {
        [styles.open]: isDropDownOpen,
      })}
    >
      <div
        onClick={() => setIsDropDownOpen((prev) => !prev)}
        className={styles.display}
      >
        {dateTemplate}
      </div>
      <div className={styles.dropdown}>
        <DateRangeLibrary
          onChange={onDateChange}
          showDateDisplay={false}
          moveRangeOnFirstSelection={false}
          months={1}
          rangeColors={["#859EE8"]}
          // @ts-ignore
          ranges={isDatesNull ? defaultDates : datepickerState.dates}
          locale={calendarLocale}
          direction="horizontal"
          staticRanges={staticRanges}
          inputRanges={inputRanges}
        />
        <div className="flex justify-between p-2">
          <Button
            onClick={onClearHandler}
            variant={"outline"}
            type="button"
          >
            {t("Common.clear")}
          </Button>
          <div className="flex gap-6">
            <Button
              onClick={onCloseHandler}
              type="button"
              variant={"outline"}
            >
            {t("Common.cancel")}
            </Button>
            <Button
              onClick={onSetHandler}
              type="button"
              className="submitDateBtn"
              variant={"default"}
            >
            {t("Common.ok")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const DatepickerSkeletton = () => {
  return (
    <div className="min-w-72 h-10 rounded-lg">
      <div className="skeleton"></div>
    </div>
  );
};

export default DateRangePicker;
