import React, { ChangeEvent } from "react";
import "./Dropdown.css";

type DropdownProps = {
  title: string;
  options: string[];
  selectedOption: string;
  onSelectOption: (selectedOption: string) => void;
};

export const Dropdown: React.FC<DropdownProps> = ({
  title,
  options,
  selectedOption,
  onSelectOption,
}) => {
  const handleOptionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = event.target.value;
    onSelectOption(selectedOption);
  };

  return (
    <div className="dropDownContainer">
      <label className="dropDownTitle">{title}</label>
      <select
        value={selectedOption}
        onChange={handleOptionChange}
        className="dropDownHeader"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
