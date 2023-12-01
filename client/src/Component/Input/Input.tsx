import React, { ChangeEvent } from "react";
import "./Input.css";

type InputProps = {
  title: string;
  type: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  component?: any;
};

export const Input: React.FC<InputProps> = ({
  title,
  type,
  value,
  onChange,
  component,
}) => {
  return (
    <>
      <div className="inputCompoContainer">
        <div className="inputCompoTitle">{title}</div>
        <input
          type={type}
          className="inputCompo"
          placeholder={title}
          value={value}
          onChange={onChange}
        ></input>
        {component}
      </div>
    </>
  );
};
