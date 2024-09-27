import React, { useEffect, useState } from "react";
import { DateRangePicker as DateRangeLibrary } from "react-date-range";
import "./daterange.css";
import styles from "./daterange.module.scss";
import classNames from "classnames";
import { Button } from "@mui/material";

export type DateRangeItem = {
  startDate: Date;
  endDate: Date;
  key: "selection";
};

interface DateRangePickerProps {
  dates: Array<DateRangeItem>;
  onChangeDate: (dates: Array<DateRangeItem>) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ dates, onChangeDate }) => {
  const [datepickerState, setDatepickerState] = useState({
    dates: dates,
  });

  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const dateTemplate = `${datepickerState.dates[0]?.startDate.toLocaleDateString()} - ${datepickerState.dates[0]?.endDate.toLocaleDateString()}`;

  const onDateChange = (item: any) => {
    const newDates = item.selection;
    return setDatepickerState({
      dates: [newDates]
    });
  };

  const onSetHandler = () => {
    onChangeDate?.(datepickerState.dates);
    setIsDropDownOpen(false);
  }

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
            onClick={() => setIsDropDownOpen(false)}
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

export default DateRangePicker;
