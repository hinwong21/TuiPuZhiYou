import React from "react";
import { InputProps } from "../Input";

export const InputTransUpper: React.FC<InputProps> = ({
  notNullable,
  title,
  type,
  value,
  onChange,
  component,
  onKeyDown,
}) => {
  return (
    <>
      <div className="inputCompoContainer">
        <div className="inputCompoTitle">
          {notNullable && <span style={{ color: "red" }}>*</span>}
          {title}
        </div>
        <input
          type={type}
          className="inputCompo transformToUpperCase"
          placeholder={title}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
        ></input>
        {component}
      </div>
    </>
  );
};
