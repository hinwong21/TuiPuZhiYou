import React, { ChangeEvent } from "react";
import "./Select.css";

type SelectProps = {
  title: string;
  options: string[];
  selectedOption: string;
  onSelectOption: (selectedOption: string) => void;
};

export const Select: React.FC<SelectProps> = ({
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
    <div className="selectContainer">
      <label className="selectTitle">{title}</label>
      <select
        value={selectedOption}
        onChange={handleOptionChange}
        className="selectHeader"
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
