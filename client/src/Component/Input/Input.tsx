import React, { ChangeEvent } from "react";
import "./Input.css";

export type InputProps = {
  notNullable?: boolean;
  title: string;
  type: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  component?: any;
  onKeyDown?: any;
};

export const Input: React.FC<InputProps> = ({
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
          className="inputCompo"
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
