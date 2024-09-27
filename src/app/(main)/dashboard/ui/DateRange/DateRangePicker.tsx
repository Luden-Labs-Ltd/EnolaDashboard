import { Button } from "@mui/material";
import classNames from "classnames";
import React, { useState } from "react";
import { DateRangePicker as DateRangeLibrary } from "react-date-range";
import "./daterange.css";
import styles from "./daterange.module.scss";

export type DateRangeItem = {
  startDate: Date;
  endDate: Date;
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
  const originDates = [...dates]
  const [datepickerState, setDatepickerState] = useState({
    dates: dates,
  });

  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const dateTemplate = `${datepickerState.dates[0]?.startDate.toLocaleDateString()} - ${datepickerState.dates[0]?.endDate.toLocaleDateString()}`;

  const onDateChange = (item: any) => {
    const newDates = item.selection;
    return setDatepickerState({
      dates: [newDates],
    });
  };

  const onCloseHandler = () => {
    setDatepickerState({
      dates: originDates
    })
    setIsDropDownOpen(false);
  };

  const onSetHandler = () => {
    onChangeDate?.(datepickerState.dates);
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
          ranges={datepickerState.dates}
          direction="horizontal"
        />
        <div className="flex justify-end p-2 gap-6">
          <Button
            onClick={onCloseHandler}
            disableTouchRipple={true}
            type="button"
            variant="text"
          >
            Close
          </Button>
          <Button
            onClick={onSetHandler}
            disableTouchRipple={true}
            type="button"
            variant="contained"
          >
            Set
          </Button>
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
