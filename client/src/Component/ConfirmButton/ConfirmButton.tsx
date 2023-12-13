import React from "react";
import "./ConfirmButton.css";

interface ButtonName {
  btnName: string;
  type?: any;
}

export const ConfirmButton = (props: ButtonName) => {
  const { btnName, type } = props;

  return (
    <>
      <button type={type} className="ConButton">
        {btnName}
      </button>
    </>
  );
};
