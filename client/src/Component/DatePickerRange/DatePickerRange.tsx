import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const DatePickerRange = () => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
  return (
    <div className="DatePickerRangeContainer">
      <div className="DatePickerRangeHeader">選擇日期範圍</div>
      <DatePicker
        selectsStart
        selected={startDate}
        onChange={(date) => setStartDate(date as Date)}
        startDate={startDate}
        endDate={endDate}
      />
      <DatePicker
        selectsEnd
        selected={endDate}
        onChange={(date) => setEndDate(date as Date)}
        endDate={endDate}
        startDate={startDate}
        minDate={startDate}
      />
    </div>
  );
};
