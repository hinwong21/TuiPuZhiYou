import React from "react";
import "./ConfirmButton.css";

export interface ButtonName {
  btnName: string;
  type?: any;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export const ConfirmButton = (props: ButtonName) => {
  const { btnName, type, onClick } = props;

  return (
    <button type={type} className="ConButton" onClick={onClick}>
      {btnName}
    </button>
  );
};
