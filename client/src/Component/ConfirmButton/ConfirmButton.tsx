import React from "react";
import "./ConfirmButton.css";

interface ButtonName {
  btnName: string;
  type?: any;
  onClick?: any;
}

export const ConfirmButton = (props: ButtonName) => {
  const { btnName, type, onClick } = props;

  return (
    <button type={type} className="ConButton" onClick={onClick}>
      {btnName}
    </button>
  );
};
