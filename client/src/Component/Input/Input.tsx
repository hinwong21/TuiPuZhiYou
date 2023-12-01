import React from "react";
import "./Input.css";

interface InputProps {
  title: string;
  type: string;
}

export const Input = (props: InputProps) => {
  const { title, type } = props;

  return (
    <div className="inputCompoContainer">
      <div className="inputCompoTitle">{title}</div>
      <input type={type} className="inputCompo" placeholder={title}></input>
    </div>
  );
};
