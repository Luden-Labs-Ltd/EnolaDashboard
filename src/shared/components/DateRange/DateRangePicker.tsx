import classNames from "classnames";
import React, { useState } from "react";
import { DateRangePicker as DateRangeLibrary } from "react-date-range";
import "./daterange.css";
import styles from "./daterange.module.scss";
import { addDays } from "date-fns";
import { Button } from "@components/shadowCDN/button";

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

  const firstDate = datepickerState.dates[0]?.startDate?.toLocaleDateString();
  const secondeDate = datepickerState.dates[0]?.endDate?.toLocaleDateString();
  const dateTemplate = isDatesNull ? "Set Date" : `${firstDate} - ${secondeDate}`;

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
          ranges={isDatesNull ?  defaultDates : datepickerState.dates}
          direction="horizontal"
        />
        <div className="flex justify-between p-2">
          <Button
            onClick={onClearHandler}
            variant={"outline"}
            type="button"
          >
            Clear
          </Button>
          <div className="flex gap-6">
            <Button
              onClick={onCloseHandler}
              type="button"
              variant={"outline"}
            >
              Close
            </Button>
            <Button
              onClick={onSetHandler}
              type="button"
              className="submitDateBtn"
              variant={"default"}
            >
              Set
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
