import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePickerRange.css";

interface DatePickerRangeProps {
  onDateChange: (start: Date | null, end: Date | null) => void;
}

export const DatePickerRange: React.FC<DatePickerRangeProps> = ({
  onDateChange,
}) => {
  const currentDate = new Date();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const lastDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );

  const [startDate, setStartDate] = useState<Date | null>(firstDayOfMonth);
  const [endDate, setEndDate] = useState<Date | null>(lastDayOfMonth);

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
    onDateChange(date, endDate);
  };

  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date);
    onDateChange(startDate, date);
  };

  return (
    <div className="datePickerRangeContainer">
      <div className="datePickerRangeHeader">選擇日期範圍</div>

      <div className="datePickerRangeSessionContainer">
        <div className="datePickerRangeSession">
          <div className="datePickerRangeSessionHeader">開始日期</div>
          <DatePicker
            selectsStart
            selected={startDate}
            onChange={handleStartDateChange}
            startDate={startDate}
            endDate={endDate}
            dateFormat="dd/MM/yyyy"
          />
        </div>

        <div className="datePickerRangeSession">
          <div className="datePickerRangeSessionHeader">結束日期</div>

          <DatePicker
            selectsEnd
            selected={endDate}
            onChange={handleEndDateChange}
            endDate={endDate}
            startDate={startDate}
            minDate={startDate}
            dateFormat="dd/MM/yyyy"
          />
        </div>
      </div>
    </div>
  );
};
