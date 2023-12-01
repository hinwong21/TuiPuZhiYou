import React from "react";
import "./Input.css";

interface InputProps {
  title: string;
}

export const Input = (props: InputProps) => {
  const { title } = props;

  return (
    <div className="inputContainer">
      <div>{title}</div>
      <input></input>
    </div>
  );
};
